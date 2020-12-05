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

/* GET home page. */
router.get('/', function(req, res, next) {
  
  let sql = mysql.format("SELECT * FROM accounts WHERE online=1");

  con.query(sql, (error, result) => {
    if(!error) {
      res.render('index', { players: result })
    }
  });
});


module.exports = router;
