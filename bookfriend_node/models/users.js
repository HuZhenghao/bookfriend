const Users = require('../lib/mongo').Users;
const Mongoose = require('mongoose');

module.exports = {
    //注册
    create: function create(user) {
        console.log(Users);
        return Users.create(user);
    },
    //通过用户名获取用户信息
    getUserByName: function getUserByName(name) {
        return Users
            .findOne({ username: name })
            .exec()
    },
    //给用户添加一条消息
    addMessage: function addMessage(name, postId) {
        let message = Users.findOne({ username: name }).message;
        message.push(postId);
        return Users
            .updateOne({ username: name }, { message: message })
            .exec();
    },
    //查询关注
    getLike: function getLike(id) {
        return Users
            .findById(Mongoose.Types.ObjectId(id))

    },

}