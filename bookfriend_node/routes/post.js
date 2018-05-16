const express = require('express');
const router = express.Router();
const PostModel = require('../models/post');
const CommentsModel = require('../models/comments');
const UserModel = require('../models/users');
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
//添加评论
router.get('/addComments', function (req, res, next) {
    let comment = {
        author: req.query.author,
        content: req.query.content,
        postId: req.query.postId
    }
    UserModel.addMessage(req.query.postAuthor, req.query.postId, req.query.authorname, req.query.content)
    CommentsModel.addComments(comment)
        .then((result) => {
            res.json({
                data: result,
                success: true,
                message: '添加成功'
            })
        })
})
//回复评论
router.get('/reply', function (req, res, next) {
    let postId = req.query.postId;
    let commentId = req.query.commentId;
    let replyObject = {
        username: req.query.username,
        oldUsername: req.query.oldUsername,
        content: req.query.content,
        time: req.query.time
    }
    UserModel.addMessageByName(req.query.oldUsername, postId, req.query.username, req.query.content)
    CommentsModel.reply(commentId, replyObject)
        .then((result) => {
            res.json({
                data: result,
                success: true,
                message: '添加成功'
            })
        })
})
//删除评论
router.get('/deleteComment', function (req, res, next) {
    CommentsModel.deleteComment(req.query.commentId)
        .then((result) => {
            res.json({
                data: result,
                success: true,
                message: '删除成功'
            })
        })
})
//删除回复
router.get('/deleteReply', function (req, res, next) {
    CommentsModel.deleteReply(req.query.commentId, req.query.index)
        .then((result) => {
            res.json({
                data: result,
                success: true,
                message: '删除成功'
            })
        })
})
//删除文章
router.get('/deletePost', function (req, res, next) {
    PostModel.deletePost(req.query.id)
        .then((result) => {
            res.json({
                data: result,
                success: true,
                message: '删除成功'
            })
        })
})

module.exports = router;