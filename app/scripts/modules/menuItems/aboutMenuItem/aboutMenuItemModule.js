define([
    'angular', 
    'config', 
    'modules/menuItems/aboutMenuItem/controllers/AboutCtrl', 
    'angular-ui-router'
    ], 

    function (angular, ApplicationConfiguration, AboutCtrl) {

        'use strict';

        var module = ApplicationConfiguration.registerModule('aboutMenuItemModule', ['ui.router']);

        module.config(function ($stateProvider) {

            $stateProvider
                .state('main.about', {
                    url: "/about",
                    views: {
                        'content' : {
                            templateUrl: "scripts/modules/menuItems/aboutMenuItem/templates/about.html",
                            controller: 'AboutCtrl'
                        }
                    }
                });
        });

        module.controller('AboutCtrl', AboutCtrl);


        module.run(function(MenuService) {
            MenuService.addMenuItem({ 
                position: 0, 
                name: 'About',
                role: 'anonymous',
                state: 'main.about'
            });
        });

        return module;
    });
