const Mongoose = require('mongoose');
let Schema = Mongoose.Schema;

Mongoose.connect("mongodb://localhost:27017/bookfriend", function (err) {
    if (err) {
        console.log('连接失败');
    } else {
        console.log('连接成功');
    }
});

let usersSchema = new Schema({
    username: { type: String, index: true, unique: true },
    password: { type: String },
    nickname: { type: String },
    info: { type: String, default: '这家伙很懒，还没有个人介绍！' },
    gender: { type: String },
    avatar: { type: String, default: '/img/defaultAvatar.png' },
    like: [{ id: { type: Mongoose.Schema.Types.ObjectId, ref: 'user' } }],
    message: [{ id: { type: Mongoose.Schema.Types.ObjectId, ref: 'post' }, name: { type: String }, content: {type: String} }]
}, { timestamps: true })
exports.Users = Mongoose.model('user', usersSchema);

let bookSchema = new Schema({
    bookname: { type: String, index: true, unique: true }
}, { timestamps: true })
exports.Book = Mongoose.model('book', bookSchema);

let postSchema = new Schema({
    author: { type: Mongoose.Schema.Types.ObjectId, ref: 'user' },
    content: { type: String },
    title: { type: String },
    pv: { type: Number, default: 0 },
    bookname: { type: String },
    img: { type: String }
}, { timestamps: true })
exports.Post = Mongoose.model('post', postSchema);

let commentsSchema = new Schema({
    author: { type: Mongoose.Schema.Types.ObjectId, ref: 'user' },
    content: { type: String },
    reply: [],
    postId: { type: Mongoose.Schema.Types.ObjectId }
}, { timestamps: true })
exports.Comments = Mongoose.model('comments', commentsSchema);

let replySchema = new Schema({
    author: { type: Mongoose.Schema.Types.ObjectId, ref: 'user' },
    content: { type: String },
    commentsId: { type: Mongoose.Schema.Types.ObjectId }
}, { timestamps: true })
exports.Reply = Mongoose.model('reply', replySchema);
