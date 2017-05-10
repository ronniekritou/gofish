'use strict';

/**
 * @ngdoc overview
 * @name gofishApp
 * @description
 * # gofishApp
 *
 * Main module of the application.
 */
angular
  .module('gofishApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $locationProvider) {
    // $locationProvider.hashPrefix('!').html5Mode(true);


    // $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: false
    // });

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/build', {
        templateUrl: 'views/build.html',
        controller: 'BuildCtrl',
        controllerAs: 'build'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
