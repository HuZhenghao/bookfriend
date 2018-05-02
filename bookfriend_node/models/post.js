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
    },
    //根据id获取某用户文章
    getPeople: function getPeople(id) {
        return Post.find({ author: Mongoose.Types.ObjectId(id) })
            .populate('author')
    }
}