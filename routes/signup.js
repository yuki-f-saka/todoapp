const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt');

router.get('/', function (req, res, next) {
  const isAuth = req.isAuthenticated();

  res.render('signup', {
    title: 'Sign up',
    isAuth: isAuth
  });
});

router.post('/', function (req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  const repassword = req.body.repassword;
  const isAuth = req.isAuthenticated();
  
  knex("users")
    .where({name: username})
    .select("*")
    .then(async function(result){
      if(result.length !== 0){
        res.render("signup", {
          title: "Sign up",
          isAuth: isAuth,
          errorMessage: ["このユーザーは既に使われています。"],
        })
      } else if (password === repassword) {
        const hashPassword = await bcrypt.hash(password, 10);
        knex("users")
          .insert({name: username, password: hashPassword})
          .then(function () {
            res.redirect("/");
          })
          .catch(function (err) {
            console.error(err);
            res.render("signup", {
              title: "Sign up",
              isAuth: isAuth,
              errorMessage: [err.sqlMessage],
            });
          });
      } else {
        res.render("signup", {
          title: "Sign up",
          errorMessage: ["パスワードが一致しません"],
        });
      }
    })
    .catch(function (err) {
      console.error(err);
      res.render("signup", {
        title: "Sign up",
        isAuth: isAuth,
        errorMessage: [err.sqlMessage],
      });
    });
});

module.exports = router;