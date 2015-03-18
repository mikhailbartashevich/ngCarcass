define([
    
        'angular',
        'ng-grid'

    ], function(angular) {
    'use strict';

    function dataTableDirective() {

        return {

            restrict: 'A',

            link: function ($scope, $elem, attrs) {

                var dataField = attrs.tableDataField || 'data',
                    options = attrs.options || 'options',
                    dataTableOptions = {};

                if (typeof $scope[options] !== 'undefined') {
                    angular.extend(dataTableOptions, $scope[options]);
                }

                $scope.$watch(dataField, function() {
                    if($scope[dataField]) {
                        $elem.dataTable( {
                            "data": $scope[dataField]
                        });
                    }

                });
                

            }

        };
    }

    return  dataTableDirective;
});