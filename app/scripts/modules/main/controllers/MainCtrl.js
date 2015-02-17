define(['services/MenuService'], function() {
    'use strict';

    function MainController($scope, $rootScope, $auth, $state, MenuService, ApiService) {

        var menuItems = MenuService.getMenuItems();
        $scope.menuItems = [];

        angular.forEach(menuItems, function(menuItem, index) {
            
            if(menuItem.role === $rootScope.user.role || menuItem.role === 'anonymous') {
                $scope.menuItems.push(menuItem);
            }

        });

        $scope.handleSignOutBtnClick = function() {

            $rootScope.user.role = 'anonymous';

            ApiService.logout();

            $state.go('login');
        };

    }

    return MainController;
});