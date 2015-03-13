define(['angular', 'bootstrap'], function(angular) {
    'use strict';

    function LoginController($scope, $rootScope, $state, ApiService) {
        
        $scope.handleLoginBtnClick = function() {
            ApiService.login($scope.loginForm)
                .then(function(response) {
                    initUser(response.data);
                })
                .catch(function(resp) {
                    $scope.errorMessage = 'Invalid credentials';
                });
        };

        $scope.handleDemoLoginBtnClick = function() {
            $rootScope.user.role = 'admin';
            $state.go('dashboard');
        };

        $scope.loginWithVendor = function(vendor) {
            ApiService.loginWithVendor(vendor) 
                .then(function(response) {
                    initUser(response.data);
                })
                .catch(function(resp) { 
                    $scope.errorMessage = 'Invalid credentials, login via vendor ' + vendor + ' failed';
                });
        };

        $scope.signUp = function() {
            ApiService.signUp($scope.registrationForm)
               .then(function(response) {
                    initUser(response.data);
                })
                .catch(function(resp) { 
                    $scope.errorMessage = 'User is not created.';
                });
        };

        function initUser(data) {
            
            if(data) {
                $rootScope.user.role = data.user.role;
            } else {
                $rootScope.user.role = 'admin';
            }

            $state.go('main.services');
        }

    }

    return  LoginController;
});