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

/*
* This will be the post router
* You will get the opportunity to actually get posts at a single page
* to write comments better or have a larger view
*
* */
router.get('/', function(req, res, next) {
    res.render('posts');
});


module.exports = router;
