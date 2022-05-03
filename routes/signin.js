const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', function (req, res, next) {
    const userId = req.session.userid;
    const isAuth = Boolean(userId);
    res.render('signin', {
        title: 'Sign in',
        isAuth: isAuth
    });
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true,
}));

module.exports = router;