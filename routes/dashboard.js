var path = require('path');
var express = require('express');
var router = express.Router();
var mysql = require('mysql')

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "liv7"
});

/* GET dashboard page. */
router.get('/', function(req, res, next) {
    // check if the user is logged in and if yes then redirect user to dashboard
    if(req.session && req.session.loggedin) {
        // send user to dashboard of
        res.redirect('/users/'+req.session.username)
    } else {
        res.redirect('/login')
    }
});

// get dashboard page of user
router.get('/users/:username', function (req, res, next) {
    if(req.session && req.session.loggedin) {
        if(req.session.username && req.session.username === req.params.username) {
            res.render('dashboard-page-home', { sessionData: req.session })
        } else {
            res.render('error')
        }
    } else {
        res.redirect('/login')
    }
});

// get manage profile page by: /dashboard/users/:username/manage/profile
router.get('/users/:username/manage/profile', function (req, res, next) {
    if(req.session && req.session.loggedin) {
        if(req.session.username && req.session.username === req.params.username) {
            res.render('dashboard-page-manage-profile', { sessionData: req.session })
        } else {
            res.render('error')
        }
    } else {
        res.redirect('/login')
    }
});


module.exports = router;
