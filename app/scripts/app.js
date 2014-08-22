'use strict';

angular.module('churchApp', [
    'ngRoute',
    'ui.bootstrap'
])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/1000_main/main.html'
            })
            .otherwise({
                redirectTo: '/'
            });

        /*$locationProvider.html5Mode(true);*/
    });