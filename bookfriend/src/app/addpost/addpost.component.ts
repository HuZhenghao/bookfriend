import { Component, OnInit } from '@angular/core';
import { flyIn } from '../animation/fly-in';
import { NzMessageService } from 'ng-zorro-antd';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css'],
  animations: [flyIn]
})
export class AddpostComponent implements OnInit {
  user;
  editorContent = "";
  editor;
  title = "";
  book = "";
  constructor(
    private _message: NzMessageService,
    public http: Http,
    public router: Router
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
  }
  //输入
  contentChange(e) {
    this.editor = e;
  }
  submit() {
    if (this.title == "") {
      this._message.create('error', "文章标题不能为空！", { nzDuration: 3000 });
      return false;
    }
    if (this.book == "") {
      this._message.create('error', "书籍标签不能为空！", { nzDuration: 3000 });
      return false;
    }
    if (this.editorContent == "") {
      this._message.create('error', "文章内容不能为空！", { nzDuration: 3000 });
      return false;
    }
    let data = new FormData();
    let img = "";
    if(this.editorContent.match(/<img.*?(?:>|\/>)/gi)){
      img = this.editorContent.match(/<img.*?(?:>|\/>)/gi)[0];
    }else{
      img = "";
    }
    data.append("author", this.user._id);
    data.append("content", this.editorContent);
    data.append("title", this.title);
    data.append("bookname", this.book);
    data.append("img", img);
    this.http.post('http://localhost:3000/post/create', data)
    .subscribe(
      data => {
        console.log(data.json().data);
        this.router.navigateByUrl('');
      },
      error => {
        console.error(error)
      }
    )
  }
}
