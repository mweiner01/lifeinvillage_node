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

/* @param

1 = username not found
2 = there is an error with your mysql query

* */


// route to get information about the given user at "/:username". Just replace /:username with the username (not the minecraft name)
// example: /api/v1/users/max -> that should send information about the user max
router.get('/users/:username', (req, res, next) => {
    // get the username given in the url
    param = req.params.username;


    // set content to json to stringify and actually get values
    res.setHeader('Content-Type', 'application/json');
    // mysql query to get all information of the given user
    let sql = mysql.format("SELECT id, username, account_description, minecraft_name, profile_picture, playtime_seconds, playtime_minutes, playtime_hours, silver_amount, general_level_number, general_level_xp, magic_level_number, magic_level_xp, forge_level_number, forge_level_xp FROM accounts WHERE username=?", [param]);

    // query to fetch those information
    con.query(sql, (err, rows) => {
        // if there is no error continue
        if(!err) {
            // check if there is api key given
            if(req.header('Api-key')) {
                // check if there is the right api key given
                if(req.header('Api-key') === "293127512391") {
                    // if there is one or more user found with given username continue
                    if (rows.length > 0) {
                        // send json
                        res.send(JSON.stringify(rows, null, 4));
                    } else {
                        // if there is no user found send json with error message and error id
                        error = {"error_id": 1, "error_message": "User not found!"}
                        res.send(JSON.stringify(error, null, 4));
                        console.log(JSON.stringify(error, null, 4))
                    }
                } else {
                    // send error message if there is the wrong api key given
                    error = {"error_id": 4, "error_message": "Wrong API key given."}
                    res.send(JSON.stringify(error, null, 4));
                    console.log(JSON.stringify(error, null, 4))
                }
            } else {
                // send error message if there is no api key given
                error = {"error_id": 3, "error_message": "No API key given."}
                res.send(JSON.stringify(error, null, 4));
                console.log(JSON.stringify(error, null, 4))
            }
        } else {
            // if there is actually an error with the mysql query then send a error message with error id and error message
            error = { "error_id": 2, "error_message": "Sorry, there is an error with the mysql query!"}
            res.send(JSON.stringify(error, null, 4));
            console.log(JSON.stringify(error, null, 4))
        }
    });
});

router.get('/posts/by-username/:username', (req, res, next) => {
    // get the username given in the url
    param = req.params.username;

    // set content to json to stringify and actually get values
    res.setHeader('Content-Type', 'application/json');
    // mysql query to get all information of the given user
    let sql = mysql.format("SELECT * FROM account_posts WHERE post_username=?", [param]);

    // query to fetch those information
    con.query(sql, (err, rows) => {
        // if there is no error continue
        if(!err) {
            // check if there is api key given
            if(req.header('Api-key')) {
                // check if there is the right api key given
                if(req.header('Api-key') === "293127512391") {
                    // if there is one or more user found with given username continue
                    if (rows.length > 0) {
                        // send json
                        res.send(JSON.stringify(rows, null, 4));
                    } else {
                        // if there is no user found send json with error message and error id
                        error = {"error_id": 1, "error_message": "Posts not found!"}
                        res.send(JSON.stringify(error, null, 4));
                        console.log(JSON.stringify(error, null, 4))
                    }
                } else {
                    // send error message if there is the wrong api key given
                    error = {"error_id": 4, "error_message": "Wrong API key given."}
                    res.send(JSON.stringify(error, null, 4));
                    console.log(JSON.stringify(error, null, 4))
                }
            } else {
                // send error message if there is no api key given
                error = {"error_id": 3, "error_message": "No API key given."}
                res.send(JSON.stringify(error, null, 4));
                console.log(JSON.stringify(error, null, 4))
            }
        } else {
            // if there is actually an error with the mysql query then send a error message with error id and error message
            error = { "error_id": 2, "error_message": "Sorry, there is an error with the mysql query!"}
            res.send(JSON.stringify(error, null, 4));
            console.log(JSON.stringify(error, null, 4))
        }
    });
});




module.exports = router;
