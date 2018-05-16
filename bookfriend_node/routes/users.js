const express = require('express');
const router = express.Router();
const UsersModel = require('../models/users');
const formidable = require('formidable');
let path = require('path');


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
//根据用户名查询
router.get('/getUserByName', function (req, res, next) {
  UsersModel.getUserByName(req.query.name)
    .then(function (result) {
      res.json({
        data: result,
        success: true,
        message: "查询成功"
      })
    })
})
//查询关注
router.get('/getLike', function (req, res, next) {
  UsersModel.getLike(req.query.id)
    .then(function (result) {
      res.json({
        data: result,
        success: true,
        message: "查询成功"
      })
    })
})

//关注
router.get('/like', function (req, res, next) {
  UsersModel.like(req.query.id, req.query.myid)
    .then(function (result) {
      res.json({
        data: result,
        success: true,
        message: "关注成功"
      })
    })
})
//取消关注
router.get('/dislike', function (req, res, next) {
  UsersModel.dislike(req.query.id, req.query.myid)
    .then(function (result) {
      res.json({
        data: result,
        success: true,
        message: "取消关注成功"
      })
    })
})
// router.post('/updateInfo', require('express-formidable')({
//   uploadDir: path.join(__dirname, 'upload'), // 上传文件目录
//   keepExtensions: true// 保留后缀
// }), function (req, res, next) {
//   const avatar = req.files.avatar;
//   const info = req.fields.info;
//   console.log(avatar);
//   console.log(info)
// })
//更新头像以及简介
router.post('/updateInfo', function (req, res, next) {
  const form = formidable.IncomingForm();
  console.log(__dirname);
  form.uploadDir = 'public/img';//上传文件的保存路径
  form.keepExtensions = true;//保存扩展名
  form.parse(req, (err, fields, files) => {
    if (err) {
      throw err;
    }
    const id = fields.id;
    const info = fields.info;
    let avatar;
    if (files.avatar) {
      avatar = '/img/' + path.basename(files.avatar.path);
    }
    UsersModel.updateInfo(id, info, avatar)
      .then(function (result) {
        res.json({
          data: result,
          success: true,
          message: "更新成功"
        })
      })
  })
})
//更改密码
router.get('/changePsw', function (req, res, next) {
  let id = req.query.id;
  let newpsw = req.query.newpsw;
  if (newpsw) {
    UsersModel.changePsw(id, newpsw)
      .then((result) => {
        res.json({
          data: result,
          success: true,
          message: "修改成功"
        })
      })

  }
})
//获取消息
router.get('/getMessage', function (req, res, next) {
  UsersModel.getMessage(req.query.id)
    .then((result) => {
      res.json({
        data: result,
        success: true,
        message: "获取成功"
      })
    })
})
router.get('/deleteMessage', function (req, res, next) {
  UsersModel.deleteMessage(req.query.id, req.query.postId)
    .then((result) => {
      res.json({
        data: result,
        success: true,
        message: "删除成功"
      })
    })
})


module.exports = router;
