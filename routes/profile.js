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
    res.render('profile-list', { data: req.session });
});

/* GET profile-page of a user with given userID
*  STILL IN WORK! */
router.get('/user/:userID', function (req, res, next) {
    param = req.params.userID;

    let sql = mysql.format("SELECT * FROM accounts WHERE id=?", [param]);
    con.query(sql, (err, rows, next) => {
        if(!err) {
            res.render('profile-page', {data: rows[0]})
        } else {
            res.render('error')
        }
    });
});


module.exports = router;
