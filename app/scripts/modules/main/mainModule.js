define([
    'angular', 
    'config', 
    'modules/main/controllers/MainCtrl',
    'modules/menuItems/servicesMenuItem/servicesMenuItemModule',
    'modules/menuItems/aboutMenuItem/aboutMenuItemModule',
    'angular-ui-router'
    ], 

    function (angular, ApplicationConfiguration, MainCtrl) {

        'use strict';

        var mainModule = ApplicationConfiguration.registerModule('mainModule', ['ui.router']);

        mainModule.config(function ($stateProvider) {

            $stateProvider
                .state('main', {
                    url: "/main",
                    templateUrl: "scripts/modules/main/templates/main.html",
                    controller: 'MainCtrl'
                });
        });

        mainModule.controller('MainCtrl', MainCtrl);

        return mainModule;
    });
