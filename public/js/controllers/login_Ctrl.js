'use strict';

angular.module('server').controller("loginCtrl", ['$scope', '$location',
    function($scope, $location) {
        $scope.onClick = function(){
            $location.path('/auth/google');
        };
}]);
