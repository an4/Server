angular.module('server')
    .config(['$routeProvider', '$locationProvider', '$httpProvider'
        function($routeProvider, $locationProvider, $httpProvider) {

            var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
                var deferred = $q.defer();

                $http.get('/loggedin').success(function(loggedIn){
                    // Check if user is authenticated.
                    if (loggedIn === '1')
                      /*$timeout(deferred.resolve, 0);*/
                      deferred.resolve();
                    // Not Authenticated
                    else {
                      $rootScope.message = 'You need to log in.';
                      //$timeout(function(){deferred.reject();}, 0);
                      deferred.reject();
                      $location.url('/');
                    }
                });
                return deferred.promise;
            };

            $httpProvider.interceptors.push(function($q, $location) {
                return {
                response: function(response) {
                    return response;
                },
                responseError: function(response) {
                    if (response.status === 401)
                        $location.url('/');
                    return $q.reject(response);
                }
                };
            });

            $routeProvider.
            // Home page
            when('/main', {
                templateUrl: 'views/main.html',
                controller: 'main',
                resolve: {
                    loggedin: checkLoggedin
                }
            }).
            // Create new card
            when('/create', {
                templateUrl: 'views/create.html',
                controller: 'create',
                resolve: {
                    loggedin: checkLoggedin
                }
            }).
            otherwise({
                redirectTo: '/'
            });

        })

        .run(function($rootScope, $http){
            $rootScope.message = '';

            // Logout function is available in any pages
            $rootScope.logout = function(){
                $rootScope.message = 'Logged out.';
                $http.post('/logout');
            };
        });
}]);
