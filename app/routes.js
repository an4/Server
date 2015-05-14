module.exports = function(app, passport) {
    app.get('/', function(request, response) {
        response.sendfile('./public/views/index.html');
    });

    app.get('/create', isLoggedIn, function(request, response) {
        response.sendfile('./public/views/create.html', {
            user : request.user
        });
    });

    app.get('/logout', function(request, response) {
        request.logout();
        response.redirect('/');
    });

    // Google
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    app.get('/auth/google/callback',
    passport.authenticate('google', {
            successRedirect : '/create',
            failureRedirect : '/'
    }));

};

function isLoggedIn(request, response, next) {
    if (request.isAuthenticated())
        return next();
    response.redirect('/');
}
