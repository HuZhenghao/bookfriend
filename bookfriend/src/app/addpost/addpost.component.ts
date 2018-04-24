import { Component, OnInit } from '@angular/core';
import { flyIn } from '../animation/fly-in';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css'],
  animations: [flyIn]
})
export class AddpostComponent implements OnInit {
  editorContent = "";
  editor;
  title;
  book;
  constructor() { }

  ngOnInit() {
  }
  //输入
  contentChange(e) {
    this.editor = e;
    console.log(e);
  }
}
