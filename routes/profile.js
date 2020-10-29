var path = require('path');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "liv7"
});

/* GET profile-list page. */
router.get('/', function(req, res, next) {
    req.session.current_url = '/profiles';
    res.render('profile-list', { data: req.session });
});

/* GET profile-page of a user with given userID
*  STILL IN WORK! */
router.get('/:username', function (req, res, next) {
    param = req.params.username;

    let sql = mysql.format("SELECT * FROM accounts WHERE username=?", [param]);
    let sql2 = mysql.format("SELECT * FROM account_posts WHERE post_username=?", [param]);

    con.query(sql, (err, rows) => {
        if(!err) {
            con.query(sql2, (err2, rows2) => {
                req.session.current_url = '/profiles/'+req.params.username;
                res.render('profile-page', {
                    data: req.session,
                    mysql: rows[0],
                    posts: rows2
                });
            });
        } else {
            res.render('error')
        }
    });
});

router.get('/:username/activity', (req, res, next) => {
    param = req.params.username;

    let sql = mysql.format("SELECT * FROM accounts WHERE username=?", [param]);

    con.query(sql, (err, rows) => {
        if(!err) {
            let sql2 = mysql.format("SELECT * FROM silver_transactions WHERE transaction_from=? OR transaction_to=?", [rows[0].minecraft_name, rows[0].minecraft_name]);
            con.query(sql2, (err2, rows2) => {
                res.render('profile-page-activity', {
                    data: req.session,
                    mysql: rows[0],
                    activity: rows2
                });
                console.log(rows2[0])
            });
        } else {
            res.render('error')
        }
    });
});

router.get('/:username/posts', (req, res, next) => {
    param = req.params.username;

    let sql = mysql.format("SELECT * FROM accounts WHERE username=?", [param]);
    let sql2 = mysql.format("SELECT * FROM account_posts WHERE post_username=?", [param]);

    con.query(sql, (err, rows) => {
        if(!err) {
            con.query(sql2, (err2, rows2) => {
                req.session.current_url = '/profiles/'+req.params.username;
                res.render('profile-page', {
                    data: req.session,
                    mysql: rows[0],
                    posts: rows2
                });
            });
        } else {
            res.render('error')
        }
    });
});




module.exports = router;
