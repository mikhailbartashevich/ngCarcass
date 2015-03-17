define([
        'angular', 
        'config', 
        'modules/dashboard/controllers/DashboardCtrl', 
        'modules/dashboard/controllers/DashboardMainCtrl',
        'modules/dashboard/controllers/DashboardChartsCtrl',
        'angular-ui-router',
        'adminlte'
    ], 

    function (angular, ApplicationConfiguration, DashboardCtrl, DashboardMainCtrl, DashboardChartsCtrl) {

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
                }).state('dashboard.main', {
                    url: "/main-dashboard",
                    templateUrl: "scripts/modules/dashboard/templates/mainDashboard.html",
                    // data: {
                    //     permissions: {
                    //         only: ['admin']
                    //     }
                    // },
                    controller: 'DashboardMainCtrl'
                }).state('dashboard.charts', {
                    url: "/charts-dashboard",
                    templateUrl: "scripts/modules/dashboard/templates/chartsDashboard.html",
                    // data: {
                    //     permissions: {
                    //         only: ['admin']
                    //     }
                    // },
                    controller: 'DashboardChartsCtrl'
                });
        });

        dashboardModule.controller('DashboardCtrl', DashboardCtrl);
        dashboardModule.controller('DashboardMainCtrl', DashboardMainCtrl);
        dashboardModule.controller('DashboardChartsCtrl', DashboardChartsCtrl);

        return dashboardModule;
    });
