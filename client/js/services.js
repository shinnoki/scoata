'use strict';

angular.module('app')
  .factory('Auth', function($http, $cookieStore, $window) {
   
    var currentUser = $cookieStore.get('user');
    $cookieStore.remove('user');

    return {
      login: function(success, error) {
        $window.location.href = '/auth/twitter';
      },
      logout: function(success, error) {
        $window.location.href = '/logout';
      },
      user: currentUser,
      isLoggedIn: currentUser != null
    };
  });
