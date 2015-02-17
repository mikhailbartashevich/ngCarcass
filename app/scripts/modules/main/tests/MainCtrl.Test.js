/* global describe, it, expect, beforeEach, afterEach, module, inject */
'use strict';

define([

    'app',
    'modules/main/mainModule',
    'angularMocks'
    
    ], function(mainModule) {

    describe('mainModule test', function() {

        beforeEach(module('satellizer', 'firebase', 'appModule', 'mainModule'));

        var scope, $location, createController;

        beforeEach(inject(function ($rootScope, $controller, _$location_, $injector) {
            $location = _$location_;
            scope = $rootScope.$new();

            var menuService = $injector.get('MenuService');

            createController = function() {
                return $controller('MainCtrl', {
                    '$scope': scope,
                    MenuService: menuService 
                });
            };
        }));

        it('should have a method to check if the path is active', function() {
            var controller = createController();
            $location.path('/about');
            expect($location.path()).toBe('/about');
            
        });

        it('should have 2 menu items', function() {
            var controller = createController();
            expect(scope.menuItems.length).toBe(2);
        });

        it('should redirect to login page on log out', function() {
            var controller = createController();
            scope.handleSignOutBtnClick();
            expect($location.path()).toBe('/');
        });


    });
});