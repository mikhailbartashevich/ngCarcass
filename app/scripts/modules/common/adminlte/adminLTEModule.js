define([
        'angular', 
        'config', 
        'modules/common/adminlte/directives/initAppDirective', 
        'adminlte'
    ], 

    function (angular, ApplicationConfiguration, initAdminLteLayout) {

        'use strict';

        var adminLTEModule = ApplicationConfiguration.registerModule('adminLTEModule');



        adminLTEModule.directive('initAdminLteLayout', initAdminLteLayout);

        return adminLTEModule;
    });
