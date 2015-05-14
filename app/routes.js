module.exports = function(app, passport) {
    app.get('/', function(request, response) {
        response.sendFile('/public/views/index.html', {
            root : process.cwd()
        });
    });

    app.get('/create', isLoggedIn, function(request, response) {
        response.sendFile('/public/views/create.html', {
            root : process.cwd(),
            user : request.user
        });
    });

    app.get('/read', isLoggedIn, function(request, response) {
        response.sendFile('/public/views/read.html', {
            root : process.cwd(),
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
            successRedirect : '/read',
            failureRedirect : '/'
    }));

};

function isLoggedIn(request, response, next) {
    if (request.isAuthenticated())
        return next();
    response.redirect('/');
}
