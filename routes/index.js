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
  // check if there is a session and if yes check if user is logged in
  if(req.session && req.session.loggedin === true) {
    // get the username of the session
    param = req.session.username;

    // mysql query string to get everything about the user
    let sql = mysql.format("SELECT * FROM accounts WHERE username=?", [param]);
    // mysq query
    con.query(sql, (err, rows, next) => {
      // if there is no error continue
      if(!err) {
        // save current_url in session variable
        req.session.current_url = '/';
        // render index with session data and also mysql rows
        res.render('index', { data: req.session, mysql: rows[0] });
      } else {
        // render error page because there is an error
        res.render('error')
      }
    });
  } else {
    // save current_url in session variable and render index page with session data
    req.session.current_url = '/';
    res.render('index', { data: req.session });
  }
});

// post request for "search user" form.
router.post('/', function (req, res, next) {
  // get the username given in form
  username = req.body.username;

  // redirect to the user profile page. If there is no user with given name then render error page.
  res.redirect('/profiles/'+username);
});


module.exports = router;
