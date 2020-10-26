var path = require('path');
var express = require('express');
var router = express.Router();

/* GET profile-list page. */
router.get('/', function(req, res, next) {
    res.render('profile-list', { data: req.session });
});

/* GET profile-page of a user with given ID
*  STILL IN WORK! */
router.get('/', function (req, res, next) {
    res.render('profile-page', { data: req.session })
});


module.exports = router;
