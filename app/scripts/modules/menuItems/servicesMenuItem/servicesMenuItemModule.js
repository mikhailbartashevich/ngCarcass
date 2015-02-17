define([
    'angular', 
    'config', 
    'modules/menuItems/servicesMenuItem/controllers/ServicesCtrl', 
    'angular-ui-router'
    ], 

    function (angular, ApplicationConfiguration, ServicesCtrl) {

        'use strict';

        var module = ApplicationConfiguration.registerModule('servicesMenuItemModule', ['ui.router']);

        module.config(function ($stateProvider) {

            $stateProvider
                .state('main.services', {
                    url: "/services",
                    views: {
                        'content' : {
                            templateUrl: "scripts/modules/menuItems/servicesMenuItem/templates/services.html",
                            controller: 'ServicesCtrl'
                        }
                    },                   
         
                    data: {
                        permissions: {
                            only: ['admin']
                        }
                    }
                });
        });

        module.controller('ServicesCtrl', ServicesCtrl);

        module.run(function(MenuService) {
            MenuService.addMenuItem({ 
                position: 2, 
                name: 'Services (admin)',
                role: 'admin',
                state: 'main.services'
            });
        });

        return module;
    });
