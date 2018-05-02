import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../login.service';
import { Http } from '@angular/http';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { flyIn } from '../animation/fly-in';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [flyIn]
})
export class LoginComponent implements OnInit, OnDestroy {
  isLogin = true;
  name: string = "";
  password: string = "";
  isLoadingOne = false;
  buttonText = "登录";
  isLoadding = false;
  constructor(
    private loginService: LoginService,
    public http: Http,
    private _message: NzMessageService,
    private route: Router
  ) { this.loginService.isShowTop = false; }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.loginService.isShowTop = true;
  }
  //更换登录注册
  changeLogin(i) {
    if (i == 0) { this.isLogin = true; this.buttonText = "登录"; }
    if (i == 1) { this.isLogin = false; this.buttonText = "注册"; }
  }
  //提交
  onSubmit() {
    this.isLoadding = true;
    if (this.isLogin) {
      this.http.post(`http://localhost:3000/users/signin`, { username: this.name, password: this.password })
        .subscribe(
          data => {
            this.isLoadding = false;
            if (data.json().success) {
              localStorage.setItem("user",JSON.stringify(data.json().data));
              window.history.back();
              this.loginService.isLogin = true;
              this.loginService.username = JSON.parse(localStorage.getItem("user")).username;
            }
            else {
              this._message.create('error', data.json().message, { nzDuration: 3000 });
            }
          },
          error => {
            this.isLoadding = false;
            console.error(error)
          }
        )
    }
    else {
      this.http.post(`http://localhost:3000/users/signup`, { username: this.name, password: this.password })
        .subscribe(
          data => {
            this.isLoadding = false;
            if (data.json().success) {
              localStorage.setItem("user",JSON.stringify(data.json().data));
              window.history.back();
              this.loginService.isLogin = true;
              this.loginService.username = JSON.parse(localStorage.getItem("user")).username;
            }
            else {
              this._message.create('error', data.json().message, { nzDuration: 3000 });
            }
          },
          error => {
            this.isLoadding = false;
            console.error(error)
          }
        )
    }
  }
}
