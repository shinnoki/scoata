'use strict';

var app = angular.module('app', ['ngResource', 'ngCookies']);

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: '/partials/top.html',
        controller: 'TopCtrl'
      })
      .when('/user', {
        templateUrl: '/partials/user-list.html',
        controller: 'UserListCtrl'
      })
      .when('/user/:id', {
        templateUrl: '/partials/user-detail.html',
        controller: 'UserDetailCtrl'
      })
      .when('/item', {
        templateUrl: '/partials/item-list.html',
        controller: 'ItemListCtrl'
      })
      .when('/item/new', {
        templateUrl: '/partials/item-new.html',
        controller: 'ItemNewCtrl'
      })
      .when('/item/:id', {
        templateUrl: '/partials/item-detail.html',
        controller: 'ItemDetailCtrl'
      })
      .when('/404', {
        templateUrl: '/partials/404.html'
      })
      .otherwise({
        redirectTo: '/404'
      });
}]);
