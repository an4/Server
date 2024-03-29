var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require('../app/models/user');

var configAuth = require('./auth');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // Google
    passport.use(new GoogleStrategy({
       clientID        : configAuth.googleAuth.clientID,
       clientSecret    : configAuth.googleAuth.clientSecret,
       callbackURL     : configAuth.googleAuth.callbackURL,
    },
    function(token, refreshToken, profile, done) {
        process.nextTick(function() {
            if(profile._json.domain === "bristol.ac.uk"){
                User.findOne({ 'google.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, user);
                    } else {
                       var newUser          = new User();

                       newUser.google.id    = profile.id;
                       newUser.google.token = token;
                       newUser.google.name  = profile.displayName;
                       newUser.google.email = profile.emails[0].value;

                       newUser.save(function(err) {
                           if (err)
                               throw err;
                           return done(null, newUser);
                       });
                    }
                });
            }else{
                return done(new Error("Invalid host domain."));
            }
        });
    }));
};
