if(typeof module === 'undefined') {
    module = {};
}

module.exports = function() {


    return {
        paths: {
            'jquery'            : '../../bower_components/jquery/dist/jquery',
            'angular'           : '../../bower_components/angular/angular',
            'angular-ui-router' : '../../bower_components/angular-ui-router/release/angular-ui-router',
            'angular-resource'  : '../../bower_components/angular-resource/angular-resource',
            'angular-animate'   : '../../bower_components/angular-animate/angular-animate',
            'angular-cookies'   : '../../bower_components/angular-cookies/angular-cookies',
            'satellizer'        : '../../bower_components/satellizer/satellizer',
            'angular-permission': '../../bower_components/angular-permission/dist/angular-permission',
            'bootstrap'         : '../../bower_components/adminlte/bootstrap/js/bootstrap',
            'angularMocks'      : '../../bower_components/angular-mocks/angular-mocks',
            'angularfire'       : '../../bower_components/angularfire/dist/angularfire',
            'firebase'          : '../../bower_components/firebase/firebase',
            'adminlte'          : '../../bower_components/adminlte/dist/js/app',
            'chartjs'           : '../../bower_components/adminlte/plugins/chartjs/Chart',
            'ng-grid'           : '../../bower_components/ng-grid/build/ng-grid',
            'templates'         : 'templates/templates'
        },

        shim: {

            'bootstrap':  {
                deps: ['jquery'],
                exports: 'bootstrap'
            },

            'angular':  {
                deps: ['jquery'],
                exports: 'angular'
            },

            'angularMocks': {
                deps:['angular'],
                'exports':'angular.mock'
            },
            
            'angular-ui-router' : {
                deps: ['angular']
            },

            'angular-permission': ['angular', 'angular-ui-router'],

            'angular-resource'  : ['angular'],
            
            'angular-animate'   : ['angular'],

            'angular-cookies' : {
                deps: ['angular']
            },

            'angularfire' : {
                deps: ['angular', 'firebase']
            },

            'ng-grid' : {
                deps: ['jquery', 'angular']
            },

            'satellizer' : {
                deps: ['angular', 'angular-cookies']
            },

            'adminlte' : {
                deps: ['jquery', 'bootstrap']
            },

            'templates' : {
                deps: ['angular']
            }
        }
    };

};


    