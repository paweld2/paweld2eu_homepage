/* Controllers */

define(['angular','jquery','appConfig'],function(angular,$,config){
    var moduleName = 'controlModule';
    var module = angular.module(moduleName,[]);
    module.controller('MainCtrl',['$scope', function($scope) {
        console.log('main controller runnign');
        $scope.world = "World";
        $(".collapse").collapse();
    }]);
    module.controller('ConfigCtrl',['$scope', function($scope) {
        $scope.configuration = config;
        $(".collapse").collapse();
    }]);
    return {
        m : module,
        name :moduleName
    };
});
