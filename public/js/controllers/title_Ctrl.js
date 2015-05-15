'use strict';

angular.module('server').controller("titleCtrl", ['$scope', '$location',
    function($scope, $location) {
        $scope.isMain = function() {
            if($location.url() === "/main") {
                return true;
            }
            return false;
        }

        $scope.create = function() {
            $location.path("/create");
        }
}]);
