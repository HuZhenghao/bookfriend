import { Component, OnInit } from '@angular/core';
import { flyIn } from '../../animation/fly-in';
import { LoginService } from "../../login.service";
import {  Http} from "@angular/http";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  animations: [flyIn]
})
export class MessageComponent implements OnInit {
  message = [];
  constructor(
    public loginService: LoginService,
    public http: Http
  ) { }

  ngOnInit() {
    this.http.get(`http://localhost:3000/users/getMessage?id=${this.loginService.user._id}`)
    .subscribe(
      data => {
        this.message = data.json().data.message;
      }
    )
  }
  //到文章页
  topost(i){
    this.http.get(`http://localhost:3000/users/deleteMessage?id=${this.loginService.user._id}&postId=${this.message[i].id._id}`)
    .subscribe(
      data => {
        
      }
    )
  }

}
