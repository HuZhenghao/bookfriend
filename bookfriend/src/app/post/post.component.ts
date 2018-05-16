import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { ActivatedRoute,Router } from "@angular/router";
import { LoginService } from '../login.service'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  postId;
  post = {
    author: {
      avatar: "",
      createdAt: "",
      info: "",
      like: [],
      message: [],
      password: "",
      updatedAt: '',
      username: '',
      _id: ''
    },
    bookname: '',
    content: '',
    createAt: '',
    img: '',
    pv: 0,
    title: '',
    updatedAt: '',
    _id: ''
  }
  comments = [];
  content = "";
  oldUsername = "";
  constructor(
    public http: Http,
    public router: ActivatedRoute,
    public route: Router,
    public loginService: LoginService
  ) { }

  ngOnInit() {
    this.router.params.subscribe(
      params => {
        this.postId = params['postId'];
        this.http.get(`http://localhost:3000/post/getPost?id=${this.postId}`)
          .subscribe(
            data => {
              this.post = data.json().data[0][0];
              this.comments = data.json().data[1];
              let time = new Date(this.post.author.createdAt);
              this.post.author.createdAt = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}`;
              for (let i = 0; i < this.comments.length; i++) {
                let commentsTime = new Date(this.comments[i].createdAt);
                this.comments[i].createdAt = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}`;
                this.comments[i].replyContent = "";
              }
            },
            error => {
              console.error(error);
            }
          )
      }
    )
  }
  //发送
  send() {
    this.http.get(`http://localhost:3000/post/addComments?postAuthor=${this.post.author._id}&authorname=${this.loginService.user.username}&author=${this.loginService.user._id}&content=${this.content}&postId=${this.postId}`)
      .subscribe(
        data => {
          let comment = data.json().data;
          comment.author = this.loginService.user;
          this.comments.push(comment);
        }
      )
  }
  //显示某个回复的编辑框
  replyToComment(i) {
    this.comments[i].isEdit = true;
    this.oldUsername = this.comments[i].author.username;
  }
  replyToReply(i, j) {
    this.comments[i].isEdit = true;
    this.oldUsername = this.comments[i].reply[j].username;
  }
  //取消某个回复的编辑
  cancelEdit(i) {
    this.comments[i].isEdit = false;
  }
  sendToComment(i) {
    let date = new Date();
    let time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    this.http.get(`http://localhost:3000/post/reply?postId=${this.postId}&commentId=${this.comments[i]._id}&username=${this.loginService.user.username}&oldUsername=${this.oldUsername}&content=${this.comments[i].replyContent}&time=${time}`)
      .subscribe(
        data => {
          this.comments[i].reply.push({
            username: this.loginService.user.username,
            oldUsername: this.oldUsername,
            content: this.comments[i].replyContent,
            time: time
          })
          this.comments[i].replyContent = "";
          this.comments[i].isEdit = false;
        }
      )
  }
  //删除评论
  deleteComments(i) {
    this.http.get(`http://localhost:3000/post/deleteComment?commentId=${this.comments[i]._id}`)
      .subscribe(
        data => {
          this.comments.splice(i, 1)
        }
      )
  }
  //删除回复
  deleteReply(i, j) {
    this.http.get(`http://localhost:3000/post/deleteReply?commentId=${this.comments[i]._id}&index=${j}`)
      .subscribe(
        data => {
          this.comments[i].reply.splice(j, 1)
        }
      )
  }
  //删除文章
  deletePost() {
    this.http.get(`http://localhost:3000/post/deletePost?id=${this.postId}`)
      .subscribe(
        data => {
          this.route.navigateByUrl('');
        }
      )
  }

}
