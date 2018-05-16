const Comments = require('../lib/mongo').Comments;

module.exports = {
    //根据书籍id获取评论
    getComments: function getComments(id) {
        return Comments.find({ postId: id })
            .populate('author')
    },
    //添加评论
    addComments: function addComments(comment) {
        return Comments.create(comment);
    },
    //回复评论
    reply: function reply(commentId, replyObject) {
        return Comments.findOne({ _id: commentId })
            .then((res) => {
                let reply = res.reply;
                reply.push(replyObject);
                return Comments
                    .update({ _id: commentId }, { reply: reply })
            })
    },
    //删除评论
    deleteComment: function deleteComment(id) {
        return Comments.remove({ _id: id })
    },
    //删除回复
    deleteReply: function deleteReply(commentId, index) {
        return Comments.findOne({ _id: commentId })
            .then((res) => {
                let reply = res.reply;
                reply.splice(index, 1);
                return Comments
                    .update({ _id: commentId }, { reply: reply })
            })
    }
}