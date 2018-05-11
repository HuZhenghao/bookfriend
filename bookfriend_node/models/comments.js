const Comments = require('../lib/mongo').Comments;

module.exports = {
    getComments: function getComments(id) {
        return Comments.find({ postId: id })
    }
}