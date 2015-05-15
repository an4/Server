var Card = require('./models/card');

module.exports = function(app, passport) {
    // app.get('/', function(request, response) {
    //     response.sendFile('/public/views/index.html', {
    //         root : process.cwd()
    //     });
    // });

    // app.get('/main', isLoggedIn, function(request, response) {
    //     response.sendFile('/public/views/index.html', {
    //         root : process.cwd(),
    //         user : request.user
    //     });
    // });
    //
    //
    // app.get('/create', isLoggedIn, function(request, response) {
    //     response.sendFile('/public/views/index.html', {
    //         root : process.cwd(),
    //         user : request.user
    //     });
    // });

    app.get('/logout', function(request, response) {
        request.logout();
        response.redirect('/');
    });

    // Route to test if the user is logged in or not.
    app.get('/loggedin', function(request, response) {
        response.send(request.isAuthenticated() ? '1' : '0');
    });

    // Google
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    app.get('/auth/google/callback',
    passport.authenticate('google', {
            successRedirect : '/#/main',
            failureRedirect : '/'
    }));

    // Blog post/get
    app.get('/api/cards', function(req, res) {
        Card.find().sort({'date': -1}).exec(function(err, cards) {
            if (err)
                res.send(err);
            res.json(cards);
        });
    });

    app.post('/api/post', function (req, res) {
        var card;
        card = new Card(req.body);
        card.save(function (err) {
            if (!err) {
              return console.log("created");
            } else {
              return console.log(err);
            }
        });
        return res.send(card);
    });

    // redirect all others to the index
    app.get('*', function(request, response) {
        response.sendFile('/public/views/index.html', {
            root : process.cwd()
        });
    });
};

var isLoggedIn = function(request, response, next) {
    if (request.isAuthenticated())
        return next();
    response.redirect('/');
}
