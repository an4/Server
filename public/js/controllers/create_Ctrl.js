'use strict';

angular.module('server').controller('createCtrl', ['$scope', '$http','$location',
    function($scope, $http, $location) {
        $scope.card = {};
        $scope.save = function() {
            // Replace newline with <br>
            $scope.card.text = $scope.card.text.replace(/(?:\r\n|\r|\n)/g, '<br/>');
            // Get date
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1;
            var yyyy = today.getFullYear();
            if(dd<10) {
                dd='0'+dd
            }
            if(mm<10) {
                mm='0'+mm
            }
            today = yyyy+'/'+mm+'/'+dd;
            $scope.card.date = today;

            $http.post('/api/post', $scope.card).
                success(function(data) {
                    // Redirect to home page
                    $location.path("/main");
                });
        }
}]);
