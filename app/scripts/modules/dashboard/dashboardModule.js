define([
        'angular', 
        'config', 
        'modules/dashboard/controllers/DashboardCtrl', 
        'angular-ui-router',
        'adminlte'
    ], 

    function (angular, ApplicationConfiguration, DashboardCtrl) {

        'use strict';

        var dashboardModule = ApplicationConfiguration.registerModule('dashboardModule', ['ui.router']);

        dashboardModule.config(function ($stateProvider) {

            $stateProvider
                .state('dashboard', {
                    url: "/dashboard",
                    templateUrl: "scripts/modules/dashboard/templates/dashboard.html",
                    // data: {
                    //     permissions: {
                    //         only: ['admin']
                    //     }
                    // },
                    controller: 'DashboardCtrl'
                });
        });

        dashboardModule.controller('DashboardCtrl', DashboardCtrl);

        return dashboardModule;
    });
