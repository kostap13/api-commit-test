// Type definitions for non-npm package mobile-messaging-cordova-plugin 1.2.9
// Project: https://github.com/infobip/mobile-messaging-cordova-plugin
// Definitions by: kostap13 <https://github.com/kostap13>,
//                 tjuric <https://github.com/tjuric>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="node" />

declare namespace MobileMessagingCordova {

    type OS = 'Android' | 'iOS';
    type Gender = 'Male' | 'Female';
    type Event = 'messageReceived' |
        'notificationTapped' |
        'tokenReceived' |
        'registrationUpdated' |
        'geofenceEntered' |
        'actionTapped' |
        'installationUpdated' |
        'userUpdated' |
        'personalized' |
        'depersonalized';

    interface Configuration {
        /**
         * The application code of your Application from Push Portal website
         */
        applicationCode: string;
        geofencingEnabled?: boolean;
        /**
         * Message storage save callback
         */
        messageStorage?: string;
        defaultMessageStorage?: boolean;
        ios?: {
            notificationTypes?: string[];
            forceCleanup?: boolean;
            logging?: boolean
        };
        android?: {
            notificationIcon: string; // a resource name for a status bar icon (without extension), located in '/platforms/android/app/src/main/res/mipmap'
            multipleNotifications: boolean;
            notificationAccentColor: string;
        };
        privacySettings?: {
            applicationCodePersistingDisabled?: boolean;
            userDataPersistingDisabled?: boolean;
            carrierInfoSendingDisabled?: boolean;
            systemInfoSendingDisabled?: boolean
        };
        notificationCategories?: [
            {
                identifier?: string;
                actions?: [
                    {
                        identifier?: string;
                        title?: string;
                        foreground?: boolean;
                        authenticationRequired?: boolean;
                        moRequired?: boolean;
                        destructive?: boolean;
                        icon?: string;
                        textInputActionButtonTitle?: string;
                        textInputPlaceholder?: string
                    }]
            }];
    }

    interface UserData {
        externalUserId: string;
        firstName?: string;
        lastName?: string;
        middleName?: string;
        gender?: Gender;
        birthday?: Date;
        phones?: string[];
        emails?: string[];
        tags?: string[];
        customAttributes?: Record<string, string>;
    }

    interface Installation {
        isPrimaryDevice?: boolean;
        isPushRegistrationEnabled?: boolean;
        notificationsEnabled?: boolean;
        geoEnabled?: boolean;
        sdkVersion?: string;
        appVersion?: string;
        os?: OS;
        osVersion: string;
        deviceManufacturer?: string;
        deviceModel?: string;
        deviceSecure?: boolean;
        language?: string;
        deviceTimezoneId?: string;
        applicationUserId?: string;
        deviceName?: string;
        customAttributes?: Record<string, string>;
    }

    interface UserIdentity {
        phones?: string[];
        emails?: string[];
        externalUserId: string;
    }

    interface PersonalizeContext {
        userIdentity: UserIdentity;
        userAttributes?: Record<string, string>;
        forceDepersonalize?: boolean;
    }

    interface Message {
        messageId: string;
        title?: string;
        body?: string;
        sound?: string;
        vibrate?: string;
        silent?: string;
        category?: string;
        customPayload?: Record<string, string>;
        internalData?: string;
    }

    interface MobileMessagingError {
        code: string;
        message: string;
    }

    interface DefaultMessageStorage {
        find(messageId: string, callback: (message: Message) => void): void;

        findAll(callback: (messages: Message[]) => void): void;

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
         * @name register
         * @param {String} event
         * @param {Function} handler will be called when event occurs
         */
        register(event: Event, handler: (message: Message) => void): void;

        on(event: Event, handler: (message: Message) => void): void;

        /**
         * Un register from MobileMessaging library event.
         *
         * @name unregister
         * @param {String} event
         * @param {Function} handler will be unregistered from event
         */
        unregister(event: Event, handler: (message: Message) => void): void;

        off(event: Event, handler: (message: Message) => void): void;

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
        getUser(callback: (data: UserData) => void, errorCallback: (error: MobileMessagingError) => void): void;

        /**
         * Saves installation to the server.
         *
         * @name saveInstallation
         * @param {Object} installation. An object containing installation data
         * @param {Function} callback will be called on success
         * @param {Function} errorCallback will be called on error
         */
        saveInstallation(installation: MobileMessagingCordova.Installation,
                         callback: (data: MobileMessagingCordova.Installation) => void,
                         errorCallback: (error: MobileMessagingError) => void): void;

        /**
         * Fetches installation from the server.
         *
         * @name fetchInstallation
         * @param {Function} callback will be called on success
         * @param {Function} errorCallback will be called on error
         */
        fetchInstallation(callback: (data: MobileMessagingCordova.Installation) => void, errorCallback: (error: MobileMessagingError) => void): void;

        /**
         * Gets locally cached installation.
         *
         * @name getInstallation
         * @param {Function} callback will be called on success
         * @param {Function} errorCallback will be called on error
         */
        getInstallation(callback: (data: Installation) => void, errorCallback: (error: MobileMessagingError) => void): void;

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
                                 callback: (data: any) => void,
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
                    callback: (data: MobileMessagingCordova.PersonalizeContext) => void,
                    errorCallback: (error: MobileMessagingError) => void): void;

        /**
         * Performs depersonalization of the current installation on the platform.
         *
         * @name depersonalize
         * @param {Function} callback will be called on success
         * @param {Function} errorCallback will be called on error
         */
        depersonalize(callback: (data: MobileMessagingCordova.PersonalizeContext) => void,
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
        markMessagesSeen(messageIds: string[],
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
