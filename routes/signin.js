const express = require('express');
const { is } = require('express/lib/request');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
    const userId = req.session.userid;
    const isAuth = Boolean(userId);
    res.render('signin', {
        title: 'Sign in',
        isAuth: isAuth
    });
});

router.post('/', function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const userId = req.session.userid;
    const isAuth = Boolean(userId);

    console.log(username);
    console.log(password);

    knex("users")
        .where({name: username, password: password})
        .select("*")
        .then(function(result){
            if(result.length === 0){
                res.render("signin", {
                    title: "Sign in",
                    isAuth: isAuth,
                    errorMessage: ["ユーザーが見つかりません。"],
                });    
            } else {
                req.session.userid = result[0].id;
                res.redirect("/");
            }
        })
        .catch(function(err) {
            console.error(err);
            res.render("signin", {
                title: "Sign in",
                errorMessage: [err.sqlMessage],
                isAuth: isAuth
            });
        });
});

module.exports = router;