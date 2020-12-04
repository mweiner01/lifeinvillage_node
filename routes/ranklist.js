var path = require('path');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "liv",
    password: "x5Z%r3o%sT@T",
    database: "liv7"
});

/* GET logout page. */
router.get('/', function(req, res, next) {
    var sql = mysql.format('SELECT * FROM accounts ORDER BY placed_blocks_amount desc limit 10')
    var sql2 = mysql.format('SELECT * FROM accounts ORDER BY destroyed_blocks_amount desc limit 10')
    con.query(sql, (error, result) => {
        if(!error) {
            con.query(sql2, (error2, result2) => {
                if(!error) {
                    res.render('ranklist', { placed_blocks: result, destroyed_blocks: result2 });
                }
            });
        }
    });
});


module.exports = router;
