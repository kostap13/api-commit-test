// Type definitions for Mobile Messaging SDK 1.2.3
// Project: https://github.com/infobip/mobile-messaging-cordova-plugin
// Definitions by: TODO:
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
declare namespace MobileMessagingCordova {

    interface Configuration {
        /**
         * The application code of your Application from Push Portal website
         */
        applicationCode: string,
        geofencingEnabled?: boolean,
        /**
         * Message storage save callback
         */
        messageStorage?: string,
        defaultMessageStorage?: boolean,
        ios?: {
            notificationTypes?: string[],
            forceCleanup?: boolean,
            logging?: boolean
        },
        privacySettings?: {
            applicationCodePersistingDisabled?: boolean,
            userDataPersistingDisabled?: boolean,
            carrierInfoSendingDisabled?: boolean,
            systemInfoSendingDisabled?: boolean
        },
        notificationCategories?: [
            {
                identifier?: string,
                actions?: [
                    {
                        identifier?: string,
                        title?: string,
                        foreground?: boolean,
                        authenticationRequired?: boolean,
                        moRequired?: boolean,
                        destructive?: boolean,
                        icon?: string,
                        textInputActionButtonTitle?: string,
                        textInputPlaceholder?: string
                    }
                    ]
            }
            ]
    }

    interface UserData {
        externalUserId: string,
        firstName?: string,
        lastName?: string,
        middleName?: string,
        gender?: string, // TODO: Enum?
        birthday?: Date
        phones?: Array<number>,
        emails?: Array<string>,
        tags?: Array<string>,
        customAttributes?: Record<string, string>
    }

    interface Installation {
        isPrimaryDevice?: boolean,
        isPushRegistrationEnabled?: boolean,
        notificationsEnabled?: boolean,
        geoEnabled?: boolean,
        sdkVersion?: string,
        appVersion?: string
        os?: string, // TODO?: Enum?
        osVersion: string,
        deviceManufacturer?: string,
        deviceModel?: string,
        deviceSecure?: boolean,
        language?: string,
        deviceTimezoneId?: string,
        applicationUserId?: string,
        deviceName?: string,
        customAttributes?: Record<string, string>
    }

    interface UserIdentity {
        phones?: Array<string>,
        emails?: Array<string>,
        externalUserId: string
    }

    interface PersonalizeContext {
        userIdentity: UserIdentity,
        userAttributes?: Record<string, string>,
        forceDepersonalize?: boolean
    }

    interface Message {
        messageId: string,
        title?: string,
        body?: string,
        sound?: string,
        vibrate?: string,
        silent?: string,
        category?: string,
        customPayload?: Record<string, string>,
        internalData?: string
    }

    interface MobileMessagingError {
        code: string,
        message: string
    }

    interface DefaultMessageStorage {
        find(messageId: string, callback: () => void): void;

        findAll(callback: () => void): void;

        delete(messageId: string, callback: () => void): void;

        deleteAll(callback: () => void): void;
    }


    interface Api {

        /**
         * Starts a new Mobile Messaging session.
         *
         * @name init
         * @param config. Configuration for Mobile Messaging
         * @param {Function} onInitError. Error callback
         */
        init(config: MobileMessagingCordova.Configuration, onInitError?: (error: MobileMessagingError) => void): void;

        /**
         * Register to event coming from MobileMessaging library.
         * The following events are supported:
         *
         *   - messageReceived
         *   - notificationTapped
         *   - registrationUpdated
         *   - tokenReceived (iOS only)
         *	 - geofenceEntered
         *	 - actionTapped
         *
         * @name register
         * @param {String} eventName
         * @param {Function} handler will be called when event occurs
         */
        register(eventName: string, handler: (message: Message) => void): void;

        // TODO: Maybe use one of them?
        on(eventName: string, handler: (message: Message) => void): void;

        /**
         * Un register from MobileMessaging library event.
         *
         * @name unregister
         * @param {String} eventName
         * @param {Function} handler will be unregistered from event
         */
        unregister(eventName: string, handler: (message: Message) => void): void;

        // TODO: Maybe use one of them?
        off(eventName: string, handler: (message: Message) => void): void;

        /**
         * Saves user data to the server.
         *
         * @name saveUser
         * @param {Object} userData. An object containing user data
         * @param {Function} callback will be called on success
         * @param {Function} errorCallback will be called on error
         */
        saveUser(userData: MobileMessagingCordova.UserData,
                 callback: (data: object) => void,
                 errorCallback: (error: MobileMessagingError) => void): void;

        /**
         * Fetch user data from the server.
         *
         * @name fetchUser
         * @param {Function} callback will be called with fetched user data on success
         * @param {Function} errorCallback will be called on error
         */
        fetchUser(callback: (data: object) => void, errorCallback: (error: MobileMessagingError) => void): void;

        /**
         * Gets user data from the locally stored cache.
         *
         * @name getUser
         * @param {Function} callback will be called with fetched user data on success
         * @param {Function} errorCallback will be called on error
         */
        getUser(callback: (data: object) => void, errorCallback: (error: MobileMessagingError) => void): void;

        /**
         * Saves installation to the server.
         *
         * @name saveInstallation
         * @param {Object} installation. An object containing installation data
         * @param {Function} callback will be called on success
         * @param {Function} errorCallback will be called on error
         */
        saveInstallation(installation: MobileMessagingCordova.Installation,
                         callback: (data: object) => void,
                         errorCallback: (error: MobileMessagingError) => void): void;

        /**
         * Fetches installation from the server.
         *
         * @name fetchInstallation
         * @param {Function} callback will be called on success
         * @param {Function} errorCallback will be called on error
         */
        fetchInstallation(callback: (data: object) => void, errorCallback: (error: MobileMessagingError) => void): void;

        /**
         * Gets locally cached installation.
         *
         * @name getInstallation
         * @param {Function} callback will be called on success
         * @param {Function} errorCallback will be called on error
         */
        getInstallation(callback: (data: object) => void, errorCallback: (error: MobileMessagingError) => void): void;

        /**
         * Sets any installation as primary for this user.
         *
         * @name setInstallationAsPrimary
         * @param {String} pushRegistrationId of an installation
         * @param {Boolean} primary or not
         * @param {Function} callback will be called on success
         * @param {Function} errorCallback will be called on error
         */
        setInstallationAsPrimary(pushRegistrationId: string,
                                 primary: boolean,
                                 callback: (data: object) => void,
                                 errorCallback: (error: MobileMessagingError) => void): void;

        /**
         * Performs personalization of the current installation on the platform.
         *
         * @name personalize
         * @param {Object} context. An object containing user identity information as well as additional user attributes.
         * @param {Function} callback will be called on success
         * @param {Function} errorCallback will be called on error
         */
        personalize(context: MobileMessagingCordova.PersonalizeContext,
                    callback: (data: object) => void,
                    errorCallback: (error: MobileMessagingError) => void): void;

        /**
         * Performs depersonalization of the current installation on the platform.
         *
         * @name depersonalize
         * @param {Function} callback will be called on success
         * @param {Function} errorCallback will be called on error
         */
        depersonalize(callback: (data: object) => void,
                      errorCallback: (error: MobileMessagingError) => void): void;

        /**
         * Performs depersonalization of the installation referenced by pushRegistrationId.
         *
         * @param {String} pushRegistrationId of the remote installation to depersonalize
         * @param {Function} callback will be called on success
         * @param {Function} errorCallback will be called on error
         */
        depersonalizeInstallation(pushRegistrationId: string,
                                  callback: (data: object) => void,
                                  errorCallback: (error: MobileMessagingError) => void): void;

        /**
         * Mark messages as seen
         *
         * @name markMessagesSeen
         * @param {Array} messageIds of identifiers of message to mark as seen
         * @param {Function} callback will be called upon completion
         * @param {Function} errorCallback will be called on error
         */
        markMessagesSeen(messageIds: Array<string>,
                         callback: (data: object) => void,
                         errorCallback: (error: MobileMessagingError) => void): void;

        /**
         * Displays built-in error dialog so that user can resolve errors during sdk initialization.
         *
         * @name showDialogForError
         * @param {Number} errorCode to display dialog for
         * @param {Function} callback will be called upon completion
         * @param {Function} errorCallback will be called on error
         */
        showDialogForError(errorCode: number,
                           callback: (data: object) => void,
                           errorCallback: (error: MobileMessagingError) => void): void;

        defaultMessageStorage(): MobileMessagingCordova.DefaultMessageStorage | undefined;
    }

}

declare var MobileMessaging: MobileMessagingCordova.Api;
