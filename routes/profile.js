var path = require('path');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var discordbot = require('./discord-bot')


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "liv7"
});

/* GET profile-list page.
* NOTE: there is no profile-list yet.
* The site will come later.
*
* Future functions:
* to filter users with some parameters like: fraction, silver count and so on
* This will allow to get in touch with specific users you want to.
* *Maybe u want to build a community of the rich* :D */

router.get('/', function (req, res, next) {
    req.session.current_url = '/profiles';
    res.render('profile-list', {data: req.session});
});

/* GET profile-page (normal) of a user with given username
*  STILL IN WORK! */
router.get('/:username', function (req, res, next) {
    // get the username given in the url
    param = req.params.username;

    // two mysql queries to get user and posts of the user
    let sql = mysql.format("SELECT * FROM accounts WHERE username=?", [param]);
    let sql2 = mysql.format("SELECT * FROM account_posts WHERE post_username=?", [param]);
    let sql3 = mysql.format("SELECT * FROM post_comments WHERE 1")

    // mysql query to fetch user data
    con.query(sql, (err, rows) => {
        // if there is no error continue
        if (!err) {
            // start second mysql query to fetch post data
            con.query(sql2, (err2, rows2) => {
                // if there is no error with the second query too then continue
                if (!err2) {
                    con.query(sql3, (err3, rows3) => {
                        // save current url in session variable and render profile page with session data, user data and post data
                        req.session.current_url = '/profiles/' + req.params.username;
                        res.render('profile-page', {
                            data: req.session,
                            mysql: rows[0],
                            posts: rows2,
                            comments: rows3
                        });
                    });
                } else {
                    // print out the error in console and render error page
                    console.log(err2)
                }
            });
        } else {
            // print out the error in console and render error page
            console.log(err)
        }
    });
});

// post request to add a comment to a post
router.post('/:username/posts', function (req, res, next) {
    post_from = req.params.username
    comment = req.body.comment;
    id = req.body.id;
    username = req.session.username;

    // two mysql query strings to get user with username and create user
    var sql = mysql.format("INSERT INTO post_comments (post_id, comment_from, comment_content, comment_date) VALUES (?, ?, ?, ?)", [id, username, comment, "Heute"]);
    con.query(sql, function (err, result) {
        // if error throw err
        if (err) {
            console.log(err)
        } else {

            // create data for discord post
            data = { 'comment_from': username, 'comment_content': comment, 'post_from': post_from }
            discordbot.createComment(data)

            // refresh page
            res.redirect('/profiles/' + req.params.username + '/posts')
        }
    });
});


/* GET profile-page (activity) of a user with given username
*  STILL IN WORK! */
router.get('/:username/activity', (req, res, next) => {
    // get the username given in the url
    param = req.params.username;

    // mysql query to fetch user data
    let sql = mysql.format("SELECT * FROM accounts WHERE username=?", [param]);

    // start mysql query num1
    con.query(sql, (err, rows) => {
        // if there is no error continue
        if (!err) {
            // 2nd mysql query to fetch activity data like transactions or levelups
            let sql2 = mysql.format("SELECT * FROM silver_transactions WHERE transaction_from=? OR transaction_to=? OR minecraft_name=? ORDER BY DATE(activity_date)=DATE(NOW() AND id)", [rows[0].minecraft_name, rows[0].minecraft_name, rows[0].minecraft_name]);
            // start 2nd mysql query
            con.query(sql2, (err2, rows2) => {
                if (!err2) {
                    // save current url in session variable and render profile-page-activity with session data, user data and activity data
                    req.session.current_url = '/profiles/' + req.params.username + '/activity';
                    res.render('profile-page-activity', {
                        data: req.session,
                        mysql: rows[0],
                        activity: rows2
                    });
                } else {
                    // print out the error in console and render error page
                    console.log(err)
                }
            });
        } else {
            // print out the error in console and render error page
            console.log(err)
        }
    });
});


/* GET profile-page (posts) of a user with given username
*  STILL IN WORK! */
router.get('/:username/posts', (req, res, next) => {
    // get the username given in the url
    param = req.params.username;

    // two mysql queries to get user and posts of the user
    let sql = mysql.format("SELECT * FROM accounts WHERE username=?", [param]);
    let sql2 = mysql.format("SELECT * FROM account_posts WHERE post_username=?", [param]);
    let sql3 = mysql.format("SELECT * FROM post_comments WHERE 1")

    // mysql query to fetch data
    con.query(sql, (err, rows) => {
        // if there is no error continue
        if (!err) {
            // start second mysql query to fetch post data
            con.query(sql2, (err2, rows2) => {
                // if there is no error with the second query too then continue
                if (!err2) {
                    con.query(sql3, (err3, rows3) => {
                        // save current url in session variable and render profile page with session data, user data and post data
                        req.session.current_url = '/profiles/' + req.params.username;
                        res.render('profile-page', {
                            data: req.session,
                            mysql: rows[0],
                            posts: rows2,
                            comments: rows3
                        });
                    });
                } else {
                    // print out the error in console and render error page
                    console.log(err2)
                }
            });
        } else {
            // print out the error in console and render error page
            console.log(err)
        }
    });
});


module.exports = router;
