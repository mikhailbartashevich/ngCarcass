define([
    'angular'
], function() {

    function UserService($rootScope, Permission) {

        return {

            roles : {
                ANONYMOUS : 'anonymous',

                ADMIN : 'admin',
            },
           
            isAnonymous: function () {
                return $rootScope.user && $rootScope.user.role === this.roles.ANONYMOUS;
            },

            isAdmin: function () {
                return $rootScope.user && $rootScope.user.role === this.roles.ADMIN;
            },

            defineRoles: function() {
                var that = this;

                Permission.defineRole('anonymous', function (stateParams) {
                    return that.isAnonymous();
                });

                Permission.defineRole('admin', function (stateParams) {
                    return that.isAdmin();
                });
            }

        };
    }

    return UserService;
});