var path = require('path');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');


var con = mysql.createConnection({
    host: "localhost",
    user: "liv",
    password: "PASS",
    database: "liv7"
});

let api_key = "293127512391";
let error_1 = {"error_id": 1, "error_message": "User not found!"};
let error_2 = { "error_id": 2, "error_message": "Sorry, there is an error with the mysql query!"}
let error_3 = {"error_id": 3, "error_message": "No API key given."}
let error_4 = {"error_id": 4, "error_message": "Wrong API key given."}
/* @param
*
* 1 = username not found
* 2 = there is an error with your mysql query
* 3 = No API key were given to the request
* 4 = Wrong API Key were given to the request
*
* */


// route to get information about the given user at "/:username". Just replace /:username with the username (not the minecraft name)
// example: /api/v1/users/d231234134213221321 -> that should send information about the user max
router.get('/users/:uuid', (req, res, next) => {
    // get the username given in the url
    param = req.params.uuid;


    // set content to json to stringify and actually get values
    res.setHeader('Content-Type', 'application/json');
    // mysql query to get all information of the given user
    let sql = mysql.format("SELECT id, username, uuid, playtime_seconds, playtime_minutes playtime_hours, destroyed_blocks_amount, placed_blocks_amount, death_count FROM accounts WHERE uuid=?", [param]);

    // query to fetch those information
    con.query(sql, (err, rows) => {
        // if there is no error continue
        if(!err) {
            // check if there is api key given
            if(req.header('Api-key')) {
                // check if there is the right api key given
                if(req.header('Api-key') === api_key) {
                    // if there is one or more user found with given username continue
                    if (rows.length > 0) {
                        // send json
                        res.send(JSON.stringify(rows, null, 4));
                    } else {
                        // if there is no user found send json with error message and error id
                        res.send(JSON.stringify(error_1, null, 4));
                        console.log(JSON.stringify(error_1, null, 4))
                    }
                } else {
                    // send error message if there is the wrong api key given
                    res.send(JSON.stringify(error_4, null, 4));
                    console.log(JSON.stringify(error_4, null, 4))
                }
            } else {
                // send error message if there is no api key given
                res.send(JSON.stringify(error_3, null, 4));
                console.log(JSON.stringify(error_3, null, 4))
            }
        } else {
            // if there is actually an error with the mysql query then send a error message with error id and error message
            res.send(JSON.stringify(error_2, null, 4));
            console.log(JSON.stringify(error_2, null, 4))
        }
    });
});


// Get Silvercount by username
router.get('/silver/by-username/:username', (req, res, next) => {
    param = req.params.username; // get username from param
    res.setHeader('Content-Type', 'application/json'); // set content to json
    let sql = mysql.format("SELECT silver_amount FROM accounts WHERE username=?", [param]); // define sql
    con.query(sql, (error, result) => {
        if(!error) {
            if(req.header('Api-Key')) {
                if(req.header('Api-Key') == api_key) {
                    if(result.length > 0) {
                        res.send(JSON.stringify(result[0], null, 4));
                    } else {
                        res.send(JSON.stringify(error_1, null, 4));
                        console.log(JSON.stringify(error_1, null, 4))
                    }
                } else {
                    res.send(JSON.stringify(error_4, null, 4));
                    console.log(JSON.stringify(error_4, null, 4))
                }
            } else {
                res.send(JSON.stringify(error_3, null, 4));
                console.log(JSON.stringify(error_3, null, 4))
            }
        } else {
            res.send(JSON.stringify(error_2, null, 4));
            console.log(JSON.stringify(error_2, null, 4))
        }
    });
});



module.exports = router;
