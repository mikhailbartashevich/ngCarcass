'use strict';

var config = module.exports();


if(window.__karma__) {
    var allTestFiles = [];
    var TEST_REGEXP = /Test\.js$/;

    var pathToModule = function(path) {
        return path.replace(/^\/base\/app\/scripts\//, '').replace(/\.js$/, '');
    };

    Object.keys(window.__karma__.files).forEach(function(file) {
         
        if (TEST_REGEXP.test(file)) {
            // Normalize paths to RequireJS module names.
            allTestFiles.push(pathToModule(file));
        }
    });
}

require.config({

    baseUrl: window.__karma__ ? '/base/app/scripts' : '/scripts',

    deps:  window.__karma__ ? allTestFiles : [],

    callback:  window.__karma__ ? window.__karma__.start : null,

    paths: config.paths,

    shim: config.shim
});

if(!window.__karma__) {

    require([
        'angular',
        'app'
        ], function(angular, app) {
            var $html = angular.element(document.getElementsByTagName('html')[0]);
            angular.element().ready(function() {
                // bootstrap the app manually
                angular.bootstrap(document, ['appModule']);
            });
        }
    );
    
}



