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

    let sql = mysql.format("SELECT * FROM accounts WHERE username=?", [param]);

    con.query(sql, (err, rows) => {
        if(!err) {
            res.send(rows);
        } else {
            res.render('error')
        }
    });
});




module.exports = router;
