module.exports = function(app, passport) {
    app.get('/', function(request, response) {
        response.sendfile('./public/views/index.html');
    });

    app.get('/login', function(request, response) {
        response.sendfile('./public/views/login.html', {message: request.flash('loginMessage') });
    });

    // app.post('/login', do all our passport stuff here);

    app.get('/signup', function(request, response) {
        esponse.sendfile('./public/views/signup.html', {message: request.flash('signupMessage') });
    });

    // app.post('/signup', do all our passport stuff here);

    app.get('/profile', isLoggedIn, function(request, response) {
        response.sendfile('./public/views/profile.html', {
            user : request.user
        });
    });

    app.get('/logout', function(request, response) {
        request.logout();
        response.redirect('/');
    });
};

function isLoggedIn(request, response, next) {
    if (request.isAuthenticated())
        return next();
    response.redirect('/');
}
