var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var path     = require('path');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

mongoose.connect(configDB.url);

require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(session({ secret: 'lPiLIO9ZEEsfk7LlD4K6',
                  resave: 'true',
                  saveUninitialized: 'true'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');

require('./app/routes.js')(app, passport);

app.listen(port);
console.log('The magic happens on port ' + port);

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    process.exit(0);
  });
});
