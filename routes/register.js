var path = require('path');
var express = require('express');
var dateFormat = require('dateformat');
var router = express.Router();
var mysql = require('mysql');
var md5 = require('md5');

var bodyParser = require('body-parser');
var discordbot = require('./discord-bot')

var urlencodedParser = bodyParser.urlencoded({extended: false})

// create connection localhost
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "liv7"
});


// get the registe rpage
router.get('/', function (req, res, next) {
    // check if user is loggedin in or not
    if (req.session.loggedin === true) {
        // send user to home
        res.redirect('/');
    } else {
        // save current url in session variable and render register page with session data
        req.session.current_url = '/register';
        res.render('register', { data: req.session });
    }
});

// post request to register user
router.post('/', urlencodedParser, function (req, res) {
    // get username and password from post request and save it in variable also encrypt password with md5
    username = req.body.username;
    password = md5(req.body.password + "makkusanstinkt");


    // two mysql query strings to get user with username and create user
    let sql2 = mysql.format("SELECT * FROM accounts WHERE username=?", [username]);
    var sql = mysql.format("INSERT INTO accounts (username, password) VALUES (?, ?)", [username, password]);
    // mysql query check if username is available
    con.query(sql2, (err, rows) => {
        // if username is not already in use continue
        if (rows.length === 0) {
            // second mysql query to create user
            con.query(sql, function (err, result) {
                // if error throw err
                if (err) throw err;
                // save username and loggedin in session variables
                req.session.username = req.body.username;
                req.session.loggedin = true;

                // create data and send message to discord
                data = { 'username': req.session.username }
                discordbot.createAccount(data)

                // render register-success page with session data
                res.redirect('/dashboard/users/'+req.session.username)
            });
        } else {
            // if username is not available save it in session variable and refresh page
            req.session.usernameNotAvailable = true;
            res.redirect('/register')
        }
    });
});

module.exports = router;