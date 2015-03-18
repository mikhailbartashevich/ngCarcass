define([
    
        'angular',
        'chartjs'

    ], function(angular) {
    'use strict';

    function chartJSDirective() {

        return {

            restrict : 'E',

            link : function(scope, el, attrs) {

                $(el).wrap('<canvas></canvas>');

                var context = $(el).parent('canvas').get(0).getContext("2d"),
                    chart = new Chart(context),               
                    dataField = attrs.chartDataField || 'data',
                    options = attrs.options || 'options',
                    realTimeDataField = attrs.realTimeDataField || 'realTimeData';

                var chartType = attrs.type || 'Line';
                 
                scope.chartPresents = false;

                scope.$on('$destroy', function() {
                    if(chart &&  chart.destroy) {
                        chart.destroy();
                    }
                });

                if(chartType === 'Line' || chartType === 'Bar') {
                    scope.$watch(realTimeDataField, function() {
                        var realTimeData = scope[realTimeDataField];

                        if(scope.chartPresents && realTimeData) {
                            chart.addData(realTimeData.values, realTimeData.label);
                            chart.removeData();
                        }
                        
                    });
                }


                scope.$watch(dataField, function() {
                    var data = scope[dataField];

                    if(scope.chartPresents && chart.destroy) {
                        chart.destroy();
                        chart = new Chart(context);
                    }

                    if(data) {

                        chart = chart[chartType](data, scope[options]);
                        scope.chartPresents = true;
                    }
                });

            }

        };


    }

    return  chartJSDirective;
});