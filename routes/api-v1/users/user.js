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
*
* 1 = username not found
* 2 = there is an error with your mysql query
* 3 = No API key were given to the request
* 4 = Wrong API Key were given to the request
*
* */


// route to get information about the given user at "/:username". Just replace /:username with the username (not the minecraft name)
// example: /api/v1/users/max -> that should send information about the user max
router.get('/users/:username', (req, res, next) => {
    // get the username given in the url
    param = req.params.username;


    // set content to json to stringify and actually get values
    res.setHeader('Content-Type', 'application/json');
    // mysql query to get all information of the given user
    let sql = mysql.format("SELECT id, username FROM accounts WHERE username=?", [param]);

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
                        let error = {"error_id": 1, "error_message": "User not found!"}
                        res.send(JSON.stringify(error, null, 4));
                        console.log(JSON.stringify(error, null, 4))
                    }
                } else {
                    // send error message if there is the wrong api key given
                    let error = {"error_id": 4, "error_message": "Wrong API key given."}
                    res.send(JSON.stringify(error, null, 4));
                    console.log(JSON.stringify(error, null, 4))
                }
            } else {
                // send error message if there is no api key given
                let error = {"error_id": 3, "error_message": "No API key given."}
                res.send(JSON.stringify(error, null, 4));
                console.log(JSON.stringify(error, null, 4))
            }
        } else {
            // if there is actually an error with the mysql query then send a error message with error id and error message
            let error = { "error_id": 2, "error_message": "Sorry, there is an error with the mysql query!"}
            res.send(JSON.stringify(error, null, 4));
            console.log(JSON.stringify(error, null, 4))
        }
    });
});




module.exports = router;
