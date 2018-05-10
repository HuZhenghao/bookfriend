import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { ActivatedRoute } from "@angular/router";

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
  comments;
  constructor(
    public http: Http,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.postId = params['postId'];
        this.http.get(`http://localhost:3000/post/getPost?id=${this.postId}`)
          .subscribe(
            data => {
              this.post = data.json().data[0][0];
              this.comments = data.json().data[1];
              let time = new Date(this.post.author.createdAt);
              this.post.author.createdAt = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}`;
            },
            error => {
              console.error(error);
            }
          )
      }
    )
  }

}
