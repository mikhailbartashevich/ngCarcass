define([
    'angular', 
    'config', 
    'modules/login/controllers/LoginCtrl', 
    'angular-ui-router'
    ], 

    function (angular, ApplicationConfiguration, LoginCtrl) {

        'use strict';

        var loginModule = ApplicationConfiguration.registerModule('loginModule', ['ui.router']);

        loginModule.config(function ($stateProvider) {

            $stateProvider
                .state('login', {
                    url: "/",
                    templateUrl: "scripts/modules/login/templates/login.html",
                    controller: 'LoginCtrl'
                })
                .state('create-account', {
                    url: "/signup",
                    templateUrl: "scripts/modules/login/templates/signup.html",
                    controller: 'LoginCtrl'
                });
        });

        loginModule.controller('LoginCtrl', LoginCtrl);

        return loginModule;
    });
