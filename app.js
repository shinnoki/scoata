/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , url = require('url')
  , mongoose = require('mongoose')
  , passport = require('passport')
  , User = require('./models/user');

var app = express();

// All environments
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon(path.join(__dirname, 'client/img/favicon.ico')));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'client')));

if (app.get('env') == 'development') {
  mongoose.connect('mongodb://localhost/scoata');
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(express.errorHandler());
}
if (app.get('env') == 'production') {
  var RedisStore = require('connect-redis')(express);
  mongoose.connect(process.env.MONGOHQ_URL);
  redisUrl = url.parse(process.env.REDISTOGO_URL);
  redisAuth = redisUrl.auth.split(':');
  app.use(express.cookieParser());
  app.use(express.session({
    secret: 'your secret here',
    store: new RedisStore({
      host: redisUrl.hostname,
      port: redisUrl.port,
      db: redisAuth[0],
      pass: redisAuth[1]
    })
  }));
}
app.use(passport.initialize());
app.use(passport.session());

passport.use(require('./passports/twitter'));

// Passport
passport.serializeUser = function(user, done) {
  console.log(user);
  return done(null, user.id);
}

passport.deserializeUser = function(id, done) {
  User.findById(id, function(err, user) {
    return done(err, user);
  });
}

// Routes configuration
require('./routes')(app)

app.set('port', process.env.PORT || 3000);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
