define([
    
        'angular',


    ], function(angular) {
    'use strict';

    function DashboardChartsController($scope, $rootScope, $interval, ApiService) {

        $scope.options = $scope.lineChartOptions = {

            responsive : true,
            maintainAspectRatio: false,
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%=datasets[i].label%></li><%}%></ul>",

        };

        var fakeData = $interval(function() {

            $scope.realTimeData = {

                label : 'Test ' + Math.floor(Math.random() * 120),

                values : [Math.random() * 100, Math.random() * 120]

            };

        }, 1000);

        $scope.$on('$destroy', function() {
            if (angular.isDefined(fakeData)) {
                $interval.cancel(fakeData);
                fakeData = undefined;
            }
        });

        ApiService.retrieveData("lineCharts", $scope, 'barChartData');

        ApiService.retrieveData("lineCharts1", $scope, 'lineChart1Data');

        ApiService.retrieveData('pieCharts', $scope, 'pieChartData');

    }

    return  DashboardChartsController;
});