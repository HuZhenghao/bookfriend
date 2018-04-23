import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { flyIn } from '../animation/fly-in';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css'],
  animations: [flyIn]
})
export class TopComponent implements OnInit {
  searchContent;
  isLogin;
  username;
  constructor(
    public loginService: LoginService,
    private http: Http,
    private route: Router
  ) { }

  ngOnInit() {
    let username = localStorage.getItem("user");
    if(username){
      this.loginService.isLogin = true;
      this.username = username;
    }else{
      this.loginService.isLogin = false;
    }
  }
  onSearch(e){

  }
  //去登录页面
  toLogin(){
    this.route.navigateByUrl('/login');
  }
  //退出登录
  logout(){
    this.loginService.isLogin = false;
    localStorage.removeItem("user");
  }
}
