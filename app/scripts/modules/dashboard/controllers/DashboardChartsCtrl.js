define([
    
        'angular',


    ], function(angular) {
    'use strict';

    function DashboardChartsController($scope, $rootScope, $state, ApiService) {

        $scope.options = $scope.lineChartOptions = {

            responsive : true,
            maintainAspectRatio: false,
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%=datasets[i].label%></li><%}%></ul>",

        };

        ApiService.retrieveData("lineCharts", $scope, 'barChartData');

        ApiService.retrieveData("lineCharts1", $scope, 'lineChart1Data');

        ApiService.retrieveData('pieCharts', $scope, 'pieChartData');

    }

    return  DashboardChartsController;
});