'use strict';

angular.module('server').controller("mainCtrl", ['$scope', '$location',
    function($scope, $location) {
        $scope.creates = function() {
            $location.path('/create');
        };
}]);
