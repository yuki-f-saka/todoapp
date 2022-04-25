const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
  res.render('signin', {
    title: 'Sign in'
  });
});

// サインイン画面で入力された、ユーザー名とパスワードをrequestから取得し、
// ユーザー名でusersテーブルを検索して、パスワードが入力された値と一致するかを確認する。
// (1)一致したらログイン成功とし、todo作成画面にリダイレクトさせる。
// (2)一致しなければ、ログイン失敗とし、サインイン画面にリダイレクトさせる。
// (3)ユーザー名がなければ、ログイン失敗とし、サインイン画面にリダイレクトさせる。
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
                    errorMessage: "ユーザーが見つかりません。"
                });    
            } else {
                res.redirect("/");
            }
        })
        .catch(function(err) {
            console.error(err);
            res.render("signin", {
                title: "Sign in",
                errorMessage: err.errorMessage,
                isAuth: false
            });
        });
});

module.exports = router;