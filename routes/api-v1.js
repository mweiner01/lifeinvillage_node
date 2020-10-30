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


router.get('/users/:username', (req, res, next) => {
    param = req.params.username;
    api_key = req.body.api_key;

    res.setHeader('Content-Type', 'application/json');
    let sql = mysql.format("SELECT id, username, account_description, minecraft_name, profile_picture, playtime_seconds, playtime_minutes, playtime_hours, silver_amount, general_level_number, general_level_xp, magic_level_number, magic_level_xp, forge_level_number, forge_level_xp FROM accounts WHERE username=?", [param]);

    con.query(sql, (err, rows) => {
        if(!err) {
            if(rows.length > 0) {
                res.send(JSON.stringify(rows, null, 4));
            } else {
                data = { "error_id": 1, "error_message": "User not found" }
                res.send(JSON.stringify(data, null, 4));
            }
        } else {
            res.render('error')
        }
    });
});




module.exports = router;
