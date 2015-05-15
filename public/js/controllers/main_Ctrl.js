'use strict';

angular.module('server').controller("mainCtrl", ['$scope', '$http',
    function($scope, $http) {
        $http.get('api/cards').success(function(data, status, headers, config) {
            $scope.cards = data;
        }).
        error(function(data, status, headers, config) {
            console.log("error");
        });
}]);
