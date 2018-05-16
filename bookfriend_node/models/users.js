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
    addMessage: function addMessage(id, postId, name, content) {
        let message = Users.findOne({ _id: id })
            .then((res) => {
                let message = res.message;
                // let repeat = false;
                // for (let i = 0; i < message.length; i++) {
                //     if (message[i].id == postId) {
                //         repeat = true;
                //     }
                // }
                // if (!repeat) {
                    console.log(name);
                    console.log(content);
                message.push({ id: postId, name: name, content: content });
                // }
                return Users
                    .updateOne({ _id: id }, { message: message })
                    .exec();
            })
    },
    //添加消息
    addMessageByName: function addMessageByName(name, postId, name, content) {
        let message = Users.findOne({ username: name })
            .then((res) => {
                let message = res.message;
                // let repeat = false;
                // for (let i = 0; i < message.length; i++) {
                //     if (message[i].id == postId) {
                //         repeat = true;
                //     }
                // }
                // if (!repeat) {
                    console.log(name, content)
                message.push({ id: postId, name: name, content: content });
                // }
                return Users
                    .updateOne({ username: name }, { message: message })
                    .exec();
            })
    },
    //获取消息
    getMessage: function getMessage(id) {
        return Users.findOne({ _id: id })
            .populate('message.id')
            .sort({ createdAt: -1 })
    },
    //删除消息
    deleteMessage: function deleteMessage(id, postId) {
        return Users.findOne({ _id: id })
            .then((res) => {
                let message = res.message;
                let length = message.length
                for (let i = 0; i < length; i++) {
                    if (message[i].id == postId) {
                        message.splice(i, 1);
                        i--;
                        length--;
                    }
                }
                return Users
                    .updateOne({ _id: id }, { message: message })
            })
    },
    //查询关注
    getLike: function getLike(id) {
        return Users.findOne({ _id: id })
            .populate('like.id')

    },
    //关注
    like: function like(id, myid) {
        return Users.findOne({ _id: myid })
            .then((res) => {
                let likes = res.like;
                likes.push({ id: id })
                return Users
                    .update({ _id: Mongoose.Types.ObjectId(myid) }, { like: likes })
            })

    },
    //取消关注
    dislike: function dislike(id, myid) {
        return Users.findOne({ _id: myid })
            .then((res) => {
                let likes = res.like;
                let length = likes.length;
                for (let i = 0; i < length; i++) {
                    if (likes[i].id == id) {
                        likes.splice(i, 1);
                        i--;
                        length--;
                    }
                }
                return Users
                    .update({ _id: Mongoose.Types.ObjectId(myid) }, { like: likes })
                    .exec();
            })
    },
    //更新基本信息
    updateInfo: function updateInfo(id, info, avatar) {
        return Users.findOne({ _id: id }, function (err, doc) {
            doc.info = info;
            if (avatar) {
                doc.avatar = avatar;
            }
            doc.save();
        })
    },
    //改密码
    changePsw: function changePsw(id, newpsw) {
        return Users.update({ _id: Mongoose.Types.ObjectId(id) }, { password: newpsw })
            .exec();
    }


}