const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

/* GET home page. */
router.get('/', function (req, res, next) {
  const isAuth = req.isAuthenticated();
  if(isAuth){
    const userId = req.user.id;
    knex("tasks")
      .where({user_id: userId})
      .select("*")
      .then(function (results) {
        res.render('index', {
          title: 'ToDo App',
          todos: results,
          isAuth: isAuth,
        });
      })
      .catch(function (err) {
        console.error(err);
        res.render('index', {
          title: 'ToDo App',
          isAuth: isAuth,
        });
      });
  }else{
    res.render('index', {
      title: 'ToDo App',
      isAuth: isAuth,
    });
  }
});

router.post('/', function (req, res, next) {
  const todo = req.body.add;
  const isAuth = req.isAuthenticated();
  const userId = req.user.id;

  knex("tasks")
    .insert({user_id: userId, content: todo})
    .then(function () {
      res.redirect('/')
    })
    .catch(function (err) {
      console.error(err);
      res.render('index', {
        title: 'ToDo App',
        isAuth: isAuth,
        errorMessage: [err.sqlMessage],
      });
    });
});

router.use('/signup', require('./signup'));
router.use('/signin', require("./signin"));
router.use('/signout', require("./signout"));

module.exports = router;
