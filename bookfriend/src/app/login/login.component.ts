import { Component, OnInit,OnDestroy } from '@angular/core';
import { LoginService } from '../login.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  isLogin = true;
  name:string = "";
  password:string = "";
  isLoadingOne = false;
  buttonText = "登录";
  isLoadding = false;
  constructor(
    private loginService: LoginService
  ) { this.loginService.isShowTop = false; }

  ngOnInit() {
  }
  ngOnDestroy(){
    this.loginService.isShowTop = true;
  }
  //更换登录注册
  changeLogin(i){
    if(i == 0){this.isLogin = true;this.buttonText = "登录";}
    if(i == 1){this.isLogin = false;this.buttonText = "注册";}
  }
}
