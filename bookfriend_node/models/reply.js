const Reply = require('../lib/mongo').Reply;

module.exports = {
    create: function create(reply) {
        return Reply.create(reply).exec();
    }
}