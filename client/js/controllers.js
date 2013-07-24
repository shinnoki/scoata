'use strict';

angular.module('app')
  .controller('NavCtrl', ['$scope', '$cookieStore', 'Auth',
    function($scope, $cookieStore, Auth) {
      $scope.user = Auth.user;
      $scope.isLoggedIn = Auth.isLoggedIn;

      $scope.login = Auth.login;
      $scope.logout = Auth.logout;
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
      var Item = $resource('/api/item');
      $scope.items = Item.query();
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
  .controller('ItemDetailCtrl', ['$scope', '$location', '$routeParams', '$resource', 'Auth',
    function($scope, $location, $routeParams, $resource, Auth) {
      var Item = $resource('/api/item/:id');
      var Record = $resource('/api/record/:id');
      
      $scope.item = Item.get({id: $routeParams.id});
      $scope.records = Record.query({item: $routeParams.id});
      $scope.user = Auth.user;
      if (Auth.isLoggedIn) {
        if ($scope.item.created_by == null ||
          $scope.item.created_by._id == Auth.user._id) {
          $scope.editable = true;
        }
      }

      $scope.remove = function() {
        Item.remove({id: $routeParams.id}, function() {
          $location.path('/item');
        });
      };

      $scope.submit = function() {
        var record = new Record($scope.record);
        record.item = $routeParams.id;
        record.$save(function(data) {
          $scope.records.push(data);
        });
      };

      $scope.removeRecord = function(record) {
        // routing conflictions shuld be fixed
        Record.remove({id: record._id}, function() {
          var index = $scope.records.indexOf(record);
          $scope.records.splice(index, 1);
        });
      };
  }]);
