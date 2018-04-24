const express = require('express');
const router = express.Router();
const PostModel = require('../models/post');

// router.post('/create', function(req, res, next){
//     let post = {
//         authorname: req.fields.authorname,
//         content: req.fields.content,
//         title: req.fields.title,
//         bookname: req.fields.bookname
//     }
//     console.log(post);
//     res.json({
//         data: []
//     })
// })
router.post('/create',function(req, res, next){
    console.log(req.body);
    res.json({
      data: "test"
    })
  })

module.exports = router;