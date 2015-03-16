define([
    'angular', 
    'config'
], function(angular, appConfig) {

    function ApiService($q, $auth, $firebase, $timeout) {

        var service;

        switch(appConfig.APPLICATION_MODE) {
            case 'firebase-client-auth' : 
                service = new FirebaseClientApiService();
            break;
            
            case 'firebase-backend-auth' : 
                service = new  FirebaseBackEndApiService();
            break;

            default :  service = new  FirebaseBackEndApiService();
        }

        function FirebaseClientApiService() {

            this.firebaseRef = new Firebase(appConfig.FIREBASE_URL);

        }

        FirebaseClientApiService.prototype.retrieveData = function(url, scope, field) {

            var fireBaseTableRef = new Firebase(appConfig.FIREBASE_URL + '/' + url);

            var promise  = $q(function(resolve, reject) {

               fireBaseTableRef.on("value", function(snapshot, error) {
                    if (error) {
                        reject(error);
                    } else {
                        $timeout(function() {
                            if(field) {
                                scope[field] = snapshot.val();
                                scope.$apply();
                            }
                            
                            resolve(snapshot.val());
                        });
                    }
                });

            });

            return promise;
        };

        FirebaseClientApiService.prototype.addData = function(tableId, data) {
            var that = this;

            var promise  = $q(function(resolve, reject) {

                var tableRef = that.firebaseRef.child(tableId);

                tableRef.set(data, function(error, response) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(response);
                    }
                });

            });

            return promise;
        };

        FirebaseClientApiService.prototype.signUp = function(registrationForm) {
            var that = this;

            var promise  = $q(function(resolve, reject) {

                that.firebaseRef.createUser(registrationForm, function(error, authData) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(authData);
                    }
                });

            });

            return promise;
        };

        FirebaseClientApiService.prototype.loginWithVendor = function(vendor) {

            var that = this;

            var promise  = $q(function(resolve, reject) {

                that.firebaseRef.authWithOAuthPopup(vendor, function(error, authData) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(authData);
                    }
                });

            });

            return promise;
        };

        FirebaseClientApiService.prototype.login = function(loginForm) {

            var that = this;

            var promise  = $q(function(resolve, reject) {

                that.firebaseRef.authWithPassword(loginForm, function(error, authData) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(authData);
                    }
                });

            });

            return promise;
        };

        FirebaseClientApiService.prototype.logout = function() {
            return '';
        };



        function FirebaseBackEndApiService() {

        }

        FirebaseBackEndApiService.prototype.addData = function(tableId, data) {
            throw new Error("Not implemented!");
        };

        FirebaseBackEndApiService.prototype.retrieveData = function(url) {
            throw new Error("Not implemented!");
        };


        FirebaseBackEndApiService.prototype.signUp = function(registrationForm) {
            //returns promise
            return $auth.signup(registrationForm);
        };

        FirebaseBackEndApiService.prototype.loginWithVendor = function(vendor) {
            //returns promise
            return $auth.authenticate(vendor);
        };

        FirebaseBackEndApiService.prototype.login = function(loginForm) {
            //returns promise
            return $auth.login(loginForm);
        };

        FirebaseBackEndApiService.prototype.logout = function() {
            //returns promise
            return $auth.logout();
        };

        return {

            login: function (loginForm) {
                return service.login(loginForm);
            },

            logout: function() {
                return service.logout();
            },

            loginWithVendor: function(vendor) {
                return service.loginWithVendor(vendor);
            },

            signUp: function(registrationForm) {
                return service.signUp(registrationForm);
            },

            addData: function(tableId, data) {
                return service.addData(tableId, data);
            },

            retrieveData : function(url, scope, field) {
                return service.retrieveData(url, scope, field);
            },

        };
    }


    return ApiService;
});