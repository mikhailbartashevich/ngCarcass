define([
    
    'angular',
    'config',
    'services/UserService',
    'services/MenuService',
    'services/ApiService',
    'modules/login/loginModule',
    'modules/main/mainModule',
    'modules/common/adminlte/adminLTEModule',
    'modules/dashboard/dashboardModule'
    
    ], 

    function (angular, ApplicationConfiguration, UserService, MenuService, ApiService) {

        'use strict';

        var app = angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.collectAllDependencies());

        app.config(function ($locationProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
        });

        app.config(function($authProvider) {

            $authProvider.loginUrl = '/api/auth/login';
            $authProvider.signupUrl = '/api/auth/signup';
            $authProvider.loginOnSignup = true;
            $authProvider.loginRedirect = null;
            $authProvider.logoutRedirect = '/';
            $authProvider.signupRedirect = null;

            $authProvider.facebook({
                url: 'api/auth/facebook',
                clientId: ApplicationConfiguration.FACEBOOK_APP_ID
            });

            $authProvider.google({
                url: 'api/auth/google',
                clientId: ApplicationConfiguration.GOOGLE_APP_ID
            });


            //server side auth
            $authProvider.twitter({
                url: 'api/auth/twitter'
            });
        });

        app.factory('ApiService', ApiService);
        app.factory('UserService', UserService);
        app.factory('MenuService', MenuService);

        app.run(function($rootScope, Permission, UserService) {
            $rootScope.user = {};
            $rootScope.user.role = UserService.roles.ANONYMOUS;
            UserService.defineRoles();
        });

        return app;
    });
