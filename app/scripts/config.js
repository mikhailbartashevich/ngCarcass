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
                FACEBOOK_APP_ID : '',
                GOOGLE_APP_ID : '',
                FIREBASE_URL: 'https://amber-heat-<your-app>.firebaseio.com/'

            };
    });