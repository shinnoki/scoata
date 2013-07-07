var _ = require('underscore')
  , path = require('path')
  , passport = require('passport')
  , UserCtrl = require('./controllers/users');


var routes = [
  // OAUTH
  {
    path: '/auth/twitter',
    httpMethod: 'GET',
    middleware: [passport.authenticate('twitter')]
  },
  {
    path: '/auth/twitter/callback',
    httpMethod: 'GET',
    middleware: [passport.authenticate('twitter', {
      successRedirect: '/',
      failureRedirect: '/'
    })]
  },
  {
    path: '/logout',
    httpMethod: 'GET',
    middleware: [function(req, res) {
      req.logout();
      res.redirect('/');
    }]
  },
  // APIs
  {
    path: '/users',
    httpMethod: 'GET',
    middleware: [UserCtrl.index]
  },

  // All other get requests should be handled by AngularJS's client-side routing system
  {
    path: '/*',
    httpMethod: 'GET',
    middleware: [function(req, res) {
      if(req.user) {
        res.cookie('user', JSON.stringify({
            'username': req.user.username,
            'profile_image_url': req.user.profile_image_url
        }));
      }
      res.render('index');
    }],
  }
];

module.exports = function(app) {
  _.each(routes, function(route) {
    var args = _.flatten([route.path, route.middleware]);

    switch(route.httpMethod.toUpperCase()) {
      case 'GET':
        app.get.apply(app, args);
        break;
      case 'POST':
        app.post.apply(app, args);
        break;
      case 'PUT':
        app.put.apply(app, args);
        break;
      case 'DELETE':
        app.delete.apply(app, args);
        break;
      default:
        throw new Error('Invalid HTTP method specified for route ' + route.path);
        break;
    }
  });
}
