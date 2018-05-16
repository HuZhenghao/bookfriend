const Post = require('../lib/mongo').Post;
const Mongoose = require('mongoose');

module.exports = {
    //创建一篇新文章
    create: function create(post) {
        return Post.create(post)
    },
    //获取所有文章
    getAll: function getAll() {
        return Post.find({})
            .populate('author')
            .sort({ createdAt: 1 })
    },
    //根据id获取某用户文章
    getPeople: function getPeople(id) {
        return Post.find({ author: Mongoose.Types.ObjectId(id) })
            .populate('author')
    },
    //搜索
    searchPosts: function searchPosts(type, content) {
        if (type == "post") {
            return Post.find({ title: new RegExp(content) })
                .populate('author')
                .sort({ createdAt: -1 })
        } else if (type == 'book') {
            return Post.find({ bookname: new RegExp(content) })
                .populate('author')
                .sort({ createdAt: -1 })
        }
    },
    //根据文章id获取文章内容
    getPost: function getPost(id) {
        return Post.find({ _id: Mongoose.Types.ObjectId(id) })
            .populate('author')
    },
    //pv+1
    pvinc: function pvinc(id) {
        return Post
            .update({ _id: id }, { $inc: { pv: 1 } })
            .exec()
    },
    //删除文章
    deletePost: function deletePost(id) {
        return Post.remove({ _id: id })
    }
}