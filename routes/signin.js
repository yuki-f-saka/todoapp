const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
  res.render('signin', {
    title: 'Sign in'
  });
});

router.post('/', function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    console.log(username);
    console.log(password);

    knex("users")
        .where({name: username, password: password})
        .select("*")
        .then(function(result){
            if(result.length === 0){
                res.render("signin", {
                    title: "Sign in",
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
                isAuth: false
            });
        });
});

module.exports = router;