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
    res.render('posts');
});


module.exports = router;
