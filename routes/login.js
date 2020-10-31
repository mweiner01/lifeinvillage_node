const path = require('path');
const express = require('express');
var dateFormat = require('dateformat');
const router = express.Router();
const mysql = require('mysql');
const md5 = require('md5');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })


// create connection with mysql localhost
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "liv7"
});

// connect with database
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});



// get the login page
router.get('/', function(req, res, next) {
    // check if user is loggedin in or not
    if(req.session.loggedin === true) {
        // if user is loggedin then send him to home
        res.redirect('/');
    } else {
        // else save current_url in session variable and render login page with session data
        req.session.current_url = '/login';
        res.render('login', { data: req.session });
    }
});

// post request to login
router.post('/', urlencodedParser, function (req, res) {
    // if user is not loggedin then continue
    if(!req.session.loggedin || req.session.loggedin === false) {
            // get username and password from post request
            username = req.body.username;
            password = md5(req.body.password + "makkusanstinkt");

            // mysql query get user with username and password
            let sql = mysql.format("SELECT * FROM accounts WHERE username=? AND password=?", [username, password]);
            // mysql query
            con.query(sql, function (err, rows) {
                // get numrows of mysql query
                numRows = rows.length;


                // if there is no error with mysql query continue
                if (!err) {
                    // if there is one result with mysql query then continue
                    if (numRows === 1) {
                        // save session variables for user and login
                        req.session.loggedin = true;
                        req.session.username = req.body.username;
                        req.session.userID = rows[0].id;
                        req.session.profile_picture = rows[0].profile_picture;
                        req.session.minecraft_name = rows[0].minecraft_name;

                        // print out that the user could login and render "login-success" page with session data
                        console.log("The user " + req.body.username + " could login!");
                        res.render('login-success', { data: req.session })
                    } else {
                        // get date if user could not login (numrows are 0 or greater then 1)
                        const date = new Date()
                        // print out date and error message
                        console.log(dateFormat(date, "dddd, mmmm dS, yyyy, h:MM:ss TT") + ":\nA user couldnt login with following name:\n" +
                            "Username: " + req.body.username);
                    }
                } else {
                    // print out error if there is an error with the mysql query
                    console.log(err);
                }
            });
    } else {
        // redirect home if u try to login again / refresh page
        res.redirect('/');
    }
});

module.exports = router;