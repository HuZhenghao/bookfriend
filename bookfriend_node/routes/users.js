const express = require('express');
const router = express.Router();
const UsersModel = require('../models/users')


/* GET users listing. */
//注册
router.post('/signup', function (req, res, next) {
  let user = {
    username: req.body.username,
    password: req.body.password
  }
  UsersModel.create(user)
    .then(function (result) {
      if (user.username && user.password) {
        res.json({
          data: result,
          success: true,
          message: "注册成功"
        })
      } else {
        res.json({
          data: [],
          success: false,
          message: "用户名或密码不能为空"
        })
      }
    })
    .catch(function (e) {
      if (e.message.indexOf('duplicate key') !== -1) {
        res.json({
          data: [],
          success: false,
          message: "用户名重复"
        })
      } else {
        res.json({
          data: [],
          success: false,
          message: "注册失败"
        })
      }
      next(e);
    })
});
//登录
router.post('/signin', function (req, res, next) {
  let reqUser = {
    username: req.body.username,
    password: req.body.password
  }
  UsersModel.getUserByName(reqUser.username)
    .then(function (user) {
      if (!user) {
        res.json({
          data: [],
          success: false,
          message: "用户名不存在"
        })
      }
      else if (user.password == reqUser.password) {
        res.json({
          data: user,
          success: true,
          message: "登陆成功"
        })
      } else {
        res.json({
          data: [],
          success: false,
          message: "密码错误"
        })
      }
    })
    .catch(next)
})

module.exports = router;
