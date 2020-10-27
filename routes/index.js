var path = require('path');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.current_url = '/';
  res.render('index', { data: req.session });
});


module.exports = router;
