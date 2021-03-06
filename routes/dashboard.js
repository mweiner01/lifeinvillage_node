var path = require('path');
var express = require('express');
var router = express.Router();
var mysql = require('mysql')

var con = mysql.createConnection({
    host: "localhost",
    user: "liv",
    password: "PASS",
    database: "liv7"
});

/* GET dashboard page. */
router.get('/', function(req, res, next) {
    // check if the user is logged in and if yes then redirect user to dashboard
    if(req.session && req.session.loggedin) {
        // send user to dashboard of
        res.redirect('/dashboard/users/'+req.session.username)
    } else {
        res.redirect('/login')
    }
});

// get dashboard page of user
router.get('/users/:username', function (req, res, next) {
    if(req.session && req.session.loggedin) {
        if(req.session.username && req.session.username === req.params.username) {
            sql = mysql.format('SELECT * FROM accounts WHERE username = ?', [req.session.username]);
            con.query(sql, (error, result) => {
                if(error) {
                    console.log(error2)
                    res.render('error');
                } else {
                    sql2 = mysql.format('SELECT * from accounts WHERE username = ?', [req.session.username]);
                    con.query(sql2, (error2, result2) => {
                        if(!error) {
                            res.render('dashboard-page-home', { sessionData: req.session, mysqlUser: result[0], accounts: result2 })
                        } else {
                            console.log(error2)
                            res.render('error');
                        }
                    });
                }
            });
        } else {
            res.render('error')
        }
    } else {
        res.redirect('/login')
    }
});

router.get('/users/:username/manage/profile', function (req, res, next) {
    if(req.session && req.session.loggedin) {
        if(req.session.username && req.session.username === req.params.username) {
            sql = mysql.format('SELECT * FROM accounts WHERE username = ?', [req.session.username]);
            con.query(sql, (error, result) => {
                if(error) {
                    console.log(error2)
                    res.render('error');
                } else {
                    sql2 = mysql.format('SELECT * from accounts WHERE username = ?', [req.session.username]);
                    con.query(sql2, (error2, result2) => {
                        if(!error) {
                            res.render('dashboard-page-manage-profile', { sessionData: req.session, mysqlUser: result[0], accounts: result2 })
                        } else {
                            console.log(error2)
                            res.render('error');
                        }
                    });
                }
            });
        } else {
            res.render('error')
        }
    } else {
        res.redirect('/login')
    }
});

router.post('/users/:username/manage/profile/changeusername', function (req, res, next) {
    if(req.session && req.session.loggedin) {
        if(req.session.username && req.session.username === req.params.username) {
            sql = mysql.format('UPDATE accounts SET username=? WHERE username=?', [req.body.username, req.session.username]);
            con.query(sql, (err, result) => {
                if(!err) {
                    req.session.username = req.body.username;
                    res.redirect('/dashboard/users/'+req.body.username+"/manage/profile")
                }
            });
        } else {
            res.render('error')
        }
    } else {
        res.redirect('/login')
    }
});



module.exports = router;
