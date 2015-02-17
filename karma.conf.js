/* global module */
"use strict";

module.exports = function(config) {
    config.set({

        basePath : './',

        files : [
            {pattern: 'bower_components/angular/angular.js', included: false},
            {pattern: 'bower_components/angular-mocks/angular-mocks.js', included: false},
            {pattern: 'bower_components/angular-ui-router/release/angular-ui-router.js', included: false},
            {pattern: 'bower_components/angular-resource/angular-resource.js', included: false},
            {pattern: 'bower_components/angular-cookies/angular-cookies.js', included: false},
            {pattern: 'bower_components/satellizer/satellizer.js', included: false},
            {pattern: 'bower_components/angularfire/dist/angularfire.js', included: false},
            {pattern: 'bower_components/firebase/firebase.js', included: false},
            {pattern: 'bower_components/angular-permission/dist/angular-permission.js', included: false},
            {pattern: 'bower_components/jquery/dist/jquery.js', included: false},
            {pattern: 'bower_components/bootstrap/dist/js/bootstrap.js', included: false},
            {pattern: 'app/scripts/templates/templates.js', included: false},
            {pattern: 'app/scripts/modules/**/*.js', included: false},
            {pattern: 'app/scripts/services/**/*.js', included: false},
            {pattern: 'app/scripts/config.js', included: false},
            {pattern: 'app/scripts/app.js', included: false},
            'app/scripts/configs/require-config-paths.js',
            // needs to be last http://karma-runner.github.io/0.12/plus/requirejs.html
            'app/scripts/configs/require-config-dev.js'
        ],

        autoWatch : true,

        frameworks: ['jasmine', 'requirejs'],

        browsers : ['PhantomJS'],

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
