var Card = require('./models/card');

module.exports = function(app, passport) {
    app.get('/logout', function(request, response) {
        request.logout();
        response.redirect('/');
    });

    // Route to test if the user is logged in or not.
    app.get('/loggedin', function(request, response) {
        response.send(request.isAuthenticated() ? request.user : '0');
    });

    // Google
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    app.get('/auth/google/callback',
    passport.authenticate('google', {
            successRedirect : '/#/main',
            failureRedirect : '/'
    }));

    // Blog post/get
    app.get('/api/cards', function(request, response) {
        Card.find().sort({'date': -1}).exec(function(err, cards) {
            if (err)
                response.send(err);
            response.json(cards);
        });
    });

    app.post('/api/post', function (request, response) {
        var card;
        card = new Card(request.body);
        card.save(function (err) {
            if (!err) {
              return console.log("created");
            } else {
              return console.log(err);
            }
        });
        return response.send(card);
    });

    app.get('/user', function(request, response) {
        response.json(request.user);
    });

    // redirect all others to the index
    app.get('*', function(request, response) {
        response.sendFile('/public/views/index.html', {
            root : process.cwd(),
            user : request.user
        });
    });
};

var isLoggedIn = function(request, response, next) {
    if (request.isAuthenticated())
        return next();
    response.redirect('/');
}
