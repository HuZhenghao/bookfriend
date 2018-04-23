const Users = require('../lib/mongo').Users;

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
    }
}