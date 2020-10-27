var path = require('path');
var express = require('express');
var dateFormat = require('dateformat');
var router = express.Router();
var mysql = require('mysql');
var md5 = require('md5');

var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false})

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "liv7"
});


router.get('/', function (req, res, next) {
    // check if user is loggedin in or not
    if (req.session.loggedin === true) {
        res.redirect('/');
    } else {
        req.session.current_url = '/register';
        res.render('register', { data: req.session });
    }
});


router.post('/', urlencodedParser, function (req, res) {
    // get username and password from post request
    username = req.body.username;
    password = md5(req.body.password + "makkusanstinkt");
    console.log("Test")

    let sql2 = mysql.format("SELECT * FROM accounts WHERE username=?", [username]);
    var sql = mysql.format("INSERT INTO accounts (username, password) VALUES (?, ?)", [username, password]);
    // mysql query check if username is available
    con.query(sql2, (err, rows) => {
        if (rows.length === 0) {
            con.query(sql, function (err, result) {
                if (err) throw err;
                req.session.username = req.body.username;
                req.session.loggedin = true;

                res.render('register-success', { data: req.session })
            });
        } else {
            req.session.usernameNotAvailable = true;
            res.redirect('/register')
        }
    });
});

module.exports = router;