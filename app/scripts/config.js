define([
    'angular',
    'angular-cookies',
    'satellizer', 
    'angular-permission',
    'templates',
    'firebase',
    'angularfire'
    ], 

    function (angular) {
        'use strict';

        // Init module configuration options
        var applicationModuleName = 'appModule';

        var applicationModuleVendorDependencies = ['satellizer', 'ngCookies', 'permission', 'main.templates', 'firebase'];

        var applicationModuleCustomDependencies = [];

        // Add a new vertical module
        var registerModule = function(moduleName, dependencies) {
            applicationModuleCustomDependencies.push(moduleName);
            return angular.module(moduleName, dependencies || []);
        };

        var collectAllDependencies = function() {
            return applicationModuleVendorDependencies.concat(applicationModuleCustomDependencies);
        };

        return {

                applicationModuleName: applicationModuleName,
                collectAllDependencies: collectAllDependencies,
                registerModule: registerModule,
                APPLICATION_MODE : 'firebase-client-auth', // or firebase-backend-auth
                FACEBOOK_APP_ID : '374436056064525',
                TWITTER_APP_ID : 'dxCBsNSfSFfmoGQhOUWBpOBVn',
                GOOGLE_APP_ID : '192844174580-irkqb2qa1t4741torob1dtcgl48qi4kt.apps.googleusercontent.com',
                FIREBASE_URL: 'https://luminous-torch-1913.firebaseio.com/'

            };
    });