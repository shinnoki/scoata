angular.module('app', ['ngResource', 'ngCookies']);

function NavCtrl($scope, $cookieStore) {
  var user = $cookieStore.get('user');
  $cookieStore.remove('user');
  if (user) {
    $scope.user = user;
    $scope.login = true;
  }
}

function MainCtrl($scope, $resource) {
  var User = $resource('/users');

  $scope.users = User.query();
}

// app.controller('NavCtrl',
//   ['$scope', '$cookieStore', function($scope, $cookieStore) {
//     $scope.user = $cookieStore.user;
//   }]
// );
// app.controller('MainCtrl',
//   ['$scope', '$resource', function($scope, $resource) {
//     var User = $resource("/users");
// 
//     $scope.users = User.query();
//   }];
// );
