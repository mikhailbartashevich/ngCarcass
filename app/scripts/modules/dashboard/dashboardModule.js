define([
        'angular', 
        'config', 
        'modules/dashboard/controllers/DashboardCtrl', 
        'modules/dashboard/controllers/DashboardMainCtrl',
        'modules/dashboard/controllers/DashboardChartsCtrl',
        'modules/dashboard/controllers/DashboardTablesCtrl',
        'ng-grid',
        'angular-ui-router',
        'adminlte'
    ], 

    function (angular, ApplicationConfiguration, DashboardCtrl, DashboardMainCtrl, DashboardChartsCtrl, DashboardTablesCtrl) {

        'use strict';

        var dashboardModule = ApplicationConfiguration.registerModule('dashboardModule', ['ui.router', 'ngGrid']);

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
                }).state('dashboard.tables', {
                    url: "/tables-dashboard",
                    templateUrl: "scripts/modules/dashboard/templates/tablesDashboard.html",
                    // data: {
                    //     permissions: {
                    //         only: ['admin']
                    //     }
                    // },
                    controller: 'DashboardTablesCtrl'
                });
        });

        dashboardModule.controller('DashboardCtrl', DashboardCtrl);
        dashboardModule.controller('DashboardMainCtrl', DashboardMainCtrl);
        dashboardModule.controller('DashboardChartsCtrl', DashboardChartsCtrl);
        dashboardModule.controller('DashboardTablesCtrl', DashboardTablesCtrl);

        return dashboardModule;
    });
