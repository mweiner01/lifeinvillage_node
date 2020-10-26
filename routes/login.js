const path = require('path');
const express = require('express');
var dateFormat = require('dateformat');
const router = express.Router();
const mysql = require('mysql');
const md5 = require('md5');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "portfolio"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


router.get('/', function(req, res, next) {
    // check if user is loggedin in or not
    if(req.session.loggedin === true) {
        res.redirect('/');
    } else {
        res.render('login');
    }
});


router.post('/', urlencodedParser, function (req, res) {
    if(!req.session.loggedin || req.session.loggedin === false) {
            // get username and password from post request
            username = req.body.username;
            password = md5(req.body.password);

            // mysql query and login user if numrows are 1
            let sql = mysql.format("SELECT * FROM accounts WHERE username=? AND password=?", [username, password]);
            // query
            con.query(sql, function (err, rows) {
                numRows = rows.length;

                if (!err) {
                    if (numRows === 1) {
                        // set session varibales for user
                        req.session.loggedin = true;
                        req.session.username = req.body.username;

                        console.log("The user " + req.body.username + " could login!");
                        res.render('login-success', {data: req.session})
                    } else {
                        const date = new Date()
                        console.log(dateFormat(date, "dddd, mmmm dS, yyyy, h:MM:ss TT") + ":\nA user couldnt login with following name:\n" +
                            "Username: " + req.body.username);
                    }
                } else {
                    console.log(err);
                }
            });
    }
});

module.exports = router;