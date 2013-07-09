'use strict';

angular.module('app')
  .controller('NavCtrl', ['$scope', '$window', '$cookieStore',
    function($scope, $window, $cookieStore) {

      var user = $cookieStore.get('user');
      $cookieStore.remove('user');
      if (user) {
        $scope.user = user;
        $scope.isLoggedIn = true;
      }

      $scope.login = function() {
        $window.location.href = '/auth/twitter';
      };

      $scope.logout = function() {
        $window.location.href = '/logout';
      };
  }])
  .controller('TopCtrl', ['$scope', '$resource',
    function($scope, $resource) {
      var Record = $resource('/api/record');
      $scope.records = Record.query();
  }])
  .controller('UserListCtrl', ['$scope', '$resource',
    function($scope, $resource) {
      var User = $resource('/api/user');
      $scope.users = User.query();
  }])
  .controller('UserDetailCtrl', ['$scope', '$routeParams', '$resource',
    function($scope, $routeParams, $resource) {
      var User = $resource('/api/user/:id', {userId:'@id'});
      $scope.user = User.get({id: $routeParams.id});
  }])
  .controller('ItemListCtrl', ['$scope', '$resource',
    function($scope, $resource) {
      var Items = $resource('/api/item');

      $scope.items = Items.query();
  }])
  .controller('ItemNewCtrl', ['$scope', '$location', '$resource',
    function($scope, $location, $resource) {
      var Item = $resource('/api/item');

      $scope.submit = function(data) {
        var item = new Item($scope.item);
        item.$save(function() {
          $location.path('/item');
        });
      };
  }])
  .controller('ItemDetailCtrl', ['$scope', '$location', '$routeParams', '$resource',
    function($scope, $location, $routeParams, $resource) {
      var Item = $resource('/api/item/:id', {userId:'@id'});
      var Record = $resource('/api/record');
      $scope.item = Item.get({id: $routeParams.id});

      $scope.remove = function() {
        Item.remove({id: $routeParams.id}, function() {
          $location.path('/item');
        });
      };

      $scope.submit = function() {
        var record = new Record($scope.record);
        record.item = $routeParams.id;
        record.$save(function() {
          $location.path('/');
        });
      };
  }]);
