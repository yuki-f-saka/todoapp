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

module.exports = router;