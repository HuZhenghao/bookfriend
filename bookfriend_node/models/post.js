const Post = require('../lib/mongo').Post;

module.exports = {
    //创建一篇新文章
    create: function create(post) {
        return Post.create(post)
    },
    //获取所有文章
    getAll: function getAll() {
        return Post.find({})
            .populate('author')
    }
}