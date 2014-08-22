'use strict';

angular.module('churchApp', [
    'ngRoute',
    'ui.bootstrap'
])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/3000_contents/contents.html'
            })
            .when('/0', {
                templateUrl: 'views/3000_contents/contents.html'
            })
            .when('/1', {
                templateUrl: 'views/3000_contents/contents1.html'
            })
            .when('/2', {
                templateUrl: 'views/3000_contents/contents2.html'
            })

            .when('/3', {
                templateUrl: 'views/3000_contents/contents3.html'
            })
            .when('/4', {
                templateUrl: 'views/3000_contents/contents4.html'
            })
            .when('/5', {
                templateUrl: 'views/3000_contents/contents5.html'
            })
            .when('/6', {
                templateUrl: 'views/3000_contents/contents6.html'
            })
            .when('/7', {
                templateUrl: 'views/3000_contents/contents7.html'
            })
            .when('/8', {
                templateUrl: 'views/3000_contents/contents8.html'
            })
            .when('/9', {
                templateUrl: 'views/3000_contents/contents9.html'
            })
            .when('/10', {
                templateUrl: 'views/3000_contents/contents10.html'
            })
            .when('/11', {
                templateUrl: 'views/3000_contents/contents11.html'
            })
            .when('/12', {
                templateUrl: 'views/3000_contents/contents12.html'
            })
            .when('/13', {
                templateUrl: 'views/3000_contents/contents13.html'
            })

            .otherwise({
                redirectTo: '/'
            });

        /*$locationProvider.html5Mode(true);*/
    });