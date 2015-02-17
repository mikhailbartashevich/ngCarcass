var config = require('./config');

var Firebase = require("firebase");

var firebaseRef = new Firebase(config.FIREBASE_URL);


var express = require('express'), 
    bodyParser = require('body-parser'),
    request = require('request'),
    qs = require('querystring'),
    
    app = express(),
    jsonParser = bodyParser.json();



app.post('/api/auth/login', jsonParser, function (request, response) {
    firebaseRef.authWithPassword({
        email : request.body.email,
        password : request.body.password
    }, function(error, authData) {
        if (error) {
            response.statusCode = 500;
            response.send("Login Failed!");
        } else {
            console.log("Authenticated successfully with payload:", authData);
            response.send( { token: 'test-token', user : { name:'Vasia', role : 'admin'}, authData : authData } );
        }
    });
});

app.post('/api/auth/signup', jsonParser, function (request, response) {
    firebaseRef.createUser({
        email : request.body.email,
        password : request.body.password
    }, function(error, authData) {
        if (error) {
            response.statusCode = 500;
            response.send(error);
        } else {
            console.log("User created successfully");
            response.send( { token: 'test-token', user : { name:'Vasia', role : 'admin'} } );
        }
    });
});

app.post('/api/auth/facebook', jsonParser, function (request, response) {
    response.send( { token: 'test-token', user : { name:'Vasia', role : 'admin'} } );    
});

app.post('/api/auth/google', jsonParser, function (request, response) {
    response.send( { token: 'test-token', user : { name:'Vasia', role : 'admin'} } );    
});

app.post('/api/auth/logged', jsonParser, function (request, response) {
    response.send( { token: 'test-token', user : { name:'Vasia', role : 'admin'} } );    
});

/*
 |--------------------------------------------------------------------------
 | Login with Twitter
 |--------------------------------------------------------------------------
 */

app.get('/api/auth/twitter', function(req, res) {
    
    var requestTokenUrl = 'https://api.twitter.com/oauth/request_token';
    var accessTokenUrl = 'https://api.twitter.com/oauth/access_token';
    var authenticateUrl = 'https://api.twitter.com/oauth/authenticate';

    if (!req.query.oauth_token || !req.query.oauth_verifier) {

        var requestTokenOauth = {
            consumer_key: config.TWITTER_KEY,
            consumer_secret: config.TWITTER_SECRET,
            callback: 'http://localhost:9000/api/auth/logged'
        };

        // Step 1. Obtain request token for the authorization popup.
        request.post({ url: requestTokenUrl, oauth: requestTokenOauth }, function(err, response, body) {
            var oauthToken = qs.parse(body);
            var params = qs.stringify({ oauth_token: oauthToken.oauth_token });

            // Step 2. Redirect to the authorization screen.
            res.redirect(authenticateUrl + '?' + params);
        });
    } else {

        var accessTokenOauth = {
            consumer_key: config.TWITTER_KEY,
            consumer_secret: config.TWITTER_SECRET,
            token: req.query.oauth_token,
            verifier: req.query.oauth_verifier
        };

        // Step 3. Exchange oauth token and oauth verifier for access token.
        request.post({ url: accessTokenUrl, oauth: accessTokenOauth }, function(err, response, profile) {
            profile = qs.parse(profile);
            res.send( { token: 'test-token', user : { name:'Vasia', role : 'admin'} } );    
        });
    }
});



var server = app.listen(9009, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port)

})
