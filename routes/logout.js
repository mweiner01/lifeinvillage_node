var path = require('path');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.loggedin && req.session.loggedin === true) {
        req.session.destroy();
        res.redirect('/');
    } else {
        res.redirect(req.session.current_url)
    }
});


module.exports = router;
