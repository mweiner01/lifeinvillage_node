var path = require('path');
var express = require('express');
var router = express.Router();

/* GET logout page. */
router.get('/', function(req, res, next) {
    // if the user is loggedin continue
    if(req.session.loggedin && req.session.loggedin === true) {
        // destroy the session and redirect the user to home
        req.session.destroy();
        res.redirect('/');
    } else {
        // if user is not loggedin then send him back to last url
        res.redirect(req.session.current_url)
    }
});


module.exports = router;
