define([
    
        'angular',


    ], function(angular) {
    'use strict';

    function DashboardController($scope, $rootScope, $state, ApiService) {

        $scope.user = {
            name : 'Demo User',
            description : {
                brief : 'Demo User - dashboard example',
                other : 'Member since March 2015'
            }
        };

        $scope.handleSignOutBtnClick = function() {

            $rootScope.user.role = 'anonymous';

            ApiService.logout();

            $state.go('login');
        };

    }

    return  DashboardController;
});