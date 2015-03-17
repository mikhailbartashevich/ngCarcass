define([
    
        'angular'


    ], function(angular) {
    'use strict';

    function DashboardTablesController($scope, $timeout, $state, ApiService) {

        ApiService.retrieveData('tableData', $scope, 'persons');

	 	$scope.filterOptions = {
		    filterText: ""
		 };

		$scope.pagingOptions = {
		    pageSizes: [10, 25, 50, 100],
		    pageSize: 10,
		    totalServerItems: 0,
		    currentPage: 1
		};

  		$scope.totalServerItems = 0;

		$scope.setPagingData = function(field, data, page, pageSize) {
		    var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
		 
		    $scope[field] = pagedData;	
		    
		    $scope.totalServerItems = data.length;
	    	$timeout(function() {
	    		$scope.$apply();
	    	});
		};

		$scope.getPagedDataAsync = function(field, pageSize, page) {
		    setTimeout(function() {      
		        if($scope.persons) {
		          	$scope.setPagingData(field, $scope.persons, page, pageSize);
		        }
		    }, 100);
		};

		$scope.$watch('pagingOptions', function() {
		    $scope.getPagedDataAsync('myData', $scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
		}, true);

		$scope.$watch('pagingOptions1', function() {
		    $scope.getPagedDataAsync('myData1', $scope.pagingOptions1.pageSize, $scope.pagingOptions1.currentPage, $scope.filterOptions.filterText);
		}, true);


		$scope.$watch('pagingOptions2', function() {
		    $scope.getPagedDataAsync('myData2', $scope.pagingOptions2.pageSize, $scope.pagingOptions2.currentPage, $scope.filterOptions.filterText);
		}, true);

		$scope.$watch('pagingOptions3', function() {
		    $scope.getPagedDataAsync('myData3', $scope.pagingOptions3.pageSize, $scope.pagingOptions3.currentPage, $scope.filterOptions.filterText);
		}, true);


		$scope.$watch('persons', function() {
		    $scope.getPagedDataAsync('myData', $scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
		    $scope.getPagedDataAsync('myData1', $scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
		    $scope.getPagedDataAsync('myData2', $scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
		    $scope.getPagedDataAsync('myData3', $scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
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