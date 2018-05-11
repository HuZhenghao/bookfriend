const express = require('express');
const router = express.Router();
const PostModel = require('../models/post');
const CommentsModel = require('../models/comments');
let path = require('path');

//创建文章
router.post('/create', require('express-formidable')({
    uploadDir: path.join(__dirname, 'upload'), // 上传文件目录
    keepExtensions: true// 保留后缀
}), function (req, res, next) {
    let post = {
        author: req.fields.author,
        content: req.fields.content,
        title: req.fields.title,
        bookname: req.fields.bookname,
        img: req.fields.img
    }
    PostModel.create(post)
        .then(function (result) {
            console.log(123);
            res.json({
                data: { id: result._id },
                success: true,
                message: '创建成功'
            })
        })
        .catch(next);
})
//查询所有文章
router.get('/getAll', function (req, res, next) {
    PostModel.getAll()
        .then(function (result) {
            res.json({
                data: result,
                success: true,
                message: '查询成功'
            })
        })
        .catch(next);
})
//查询某人文章
router.get('/getPeople', function (req, res, next) {
    PostModel.getPeople(req.query.id)
        .then(function (result) {
            res.json({
                data: result,
                success: true,
                message: '查询成功'
            })
        })
})
//关键词搜索
router.get('/searchPosts', function (req, res, next) {
    PostModel.searchPosts(req.query.type, req.query.content)
        .then((result) => {
            res.json({
                data: result,
                success: true,
                message: '查询成功'
            })
        })
})
//查询一篇文章
router.get('/getPost', function (req, res, next) {
    let id = req.query.id;
    Promise.all([
        PostModel.getPost(id),
        CommentsModel.getComments(id),
        PostModel.pvinc(id)
    ]).then((result) => {
        res.json({
            data: result,
            success: true,
            message: '查询成功'
        })
    })
})

module.exports = router;