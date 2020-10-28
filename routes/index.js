var path = require('path');
var express = require('express');
var router = express.Router();
var mysql = require('mysql')

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "liv7"
});

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session && req.session.loggedin === true) {
    param = req.session.username;

    let sql = mysql.format("SELECT * FROM accounts WHERE username=?", [param]);
    con.query(sql, (err, rows, next) => {
      if(!err) {
        req.session.current_url = '/';
        res.render('index', { data: req.session, mysql: rows[0] });
      } else {
        res.render('error')
      }
    });
  } else {
    req.session.current_url = '/';
    res.render('index', { data: req.session });
  }
});

router.post('/', function (req, res, next) {
  username = req.body.username;

  res.redirect('/profiles/'+username);
});


module.exports = router;
