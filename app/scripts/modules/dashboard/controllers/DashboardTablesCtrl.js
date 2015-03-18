define([
    
        'angular',
        'config'


    ], function(angular, appConfig) {
    'use strict';

    function DashboardTablesController($scope, $timeout, $state, ApiService, FireBasePaginatorService) {

        var pageLimit = 10;

        var fireBaseTableRef = new Firebase(appConfig.FIREBASE_URL + '/tableData');
        var paginator = FireBasePaginatorService.initPaginator(fireBaseTableRef, pageLimit);

        $scope.filterOptions = {
            filterText: ""
         };

        $scope.pagingOptions = {
            pageSizes: [pageLimit],
            pageSize: pageLimit,
            totalServerItems: 11,
            currentPage: 1
        };

        $scope.totalServerItems = 11;

        $scope.setPagingData = function(field, pageSize, page, data) {
         
            $scope[field] = data;  
            
            $scope.totalServerItems = pageSize*page + 1;
            $timeout(function() {
                $scope.$apply();
            });
        };

        function loaded(snapshot, field, newPage, oldPage) {
            var objects = [];

            angular.forEach(snapshot, function(value, key) {
                objects.push(value);
            });

            $scope.setPagingData(field, newPage.pageSize, newPage.currentPage, objects);
        }

        $scope.getPagedDataAsync = function(field, newPage, oldPage) {
            setTimeout(function() {

                if(newPage.currentPage > oldPage.currentPage || newPage.currentPage === oldPage.currentPage) {

                    paginator.nextPage(function(snapshot) {
                        loaded(snapshot, field, newPage, oldPage);
                    });

                } else {

                    paginator.prevPage(function(snapshot) {
                        loaded(snapshot, field, newPage, oldPage);
                    });

                }


            }, 100);
        };

        $scope.$watch('pagingOptions', function(newPage, oldPage) {
            $scope.getPagedDataAsync('myData',  newPage, oldPage);
        }, true);

        $scope.$watch('pagingOptions1', function(newPage, oldPage) {
            $scope.getPagedDataAsync('myData1', newPage, oldPage);
        }, true);


        $scope.$watch('pagingOptions2', function(newPage, oldPage) {
            $scope.getPagedDataAsync('myData2',  newPage, oldPage);
        }, true);

        $scope.$watch('pagingOptions3', function(newPage, oldPage) {
            $scope.getPagedDataAsync('myData3',  newPage, oldPage);
        }, true);

        $scope.gridOptions = { 
            data: 'myData',
            enablePaging: true,
            showFooter: true,
            totalServerItems : 'totalServerItems',
            pagingOptions: $scope.pagingOptions,
            columnDefs: [
                { field: 'firstName', displayName: 'First Name', width: "40%", resizable: false},
                { field: 'lastName', displayName: 'Last Name', width: "40%" },
                { field: 'id', displayName: 'ID', width: "20%" }
            ]

        };

        $scope.pagingOptions1 = angular.copy($scope.pagingOptions);

        $scope.gridOptions1 = { 
            data: 'myData1',
            enablePaging: true,
            showFooter: true,
            totalServerItems : 'totalServerItems',
            pagingOptions: $scope.pagingOptions1,
            columnDefs: [
                { field: 'firstName', displayName: 'First Name', width: "40%", resizable: false},
                { field: 'lastName', displayName: 'Last Name', width: "40%" },
                { field: 'id', displayName: 'ID', width: "20%" }
            ]

        };

        $scope.pagingOptions2 = angular.copy($scope.pagingOptions);

        $scope.gridOptions2 = { 
            data: 'myData2',
            enablePaging: true,
            showFooter: true,
            totalServerItems : 'totalServerItems',
            pagingOptions: $scope.pagingOptions2,
            columnDefs: [
                { field: 'firstName', displayName: 'First Name', width: "40%", resizable: false},
                { field: 'lastName', displayName: 'Last Name', width: "40%" },
                { field: 'id', displayName: 'ID', width: "20%" }
            ]

        };

        $scope.pagingOptions3 = angular.copy($scope.pagingOptions);


        $scope.gridOptions3 = { 
            data: 'myData3',
            enablePaging: true,
            showFooter: true,
            totalServerItems : 'totalServerItems',
            pagingOptions: $scope.pagingOptions3,
            columnDefs: [
                { field: 'firstName', displayName: 'First Name', width: "40%", resizable: false},
                { field: 'lastName', displayName: 'Last Name', width: "40%" },
                { field: 'id', displayName: 'ID', width: "20%" }
            ]

        };

    }

    return  DashboardTablesController;
});