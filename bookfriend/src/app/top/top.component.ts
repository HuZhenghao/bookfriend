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
  user;
  select = '文章';
  constructor(
    public loginService: LoginService,
    private http: Http,
    private route: Router
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    console.log(this.user)
    this.loginService.user = this.user;
    if (this.loginService.user) {
      this.loginService.isLogin = true;
    } else {
      this.loginService.isLogin = false;
    }
  }
  //去登录页面
  toLogin() {
    this.route.navigateByUrl('/login');
  }
  //退出登录
  logout() {
    this.loginService.isLogin = false;
    localStorage.removeItem("user");
  }
  //搜索
  onSearch(e) {
    console.log(this.select);
    if (this.select == '文章') {
      this.loginService.searchType = 'post'
    } else {
      this.loginService.searchType = 'book'
    }
    if (!this.searchContent) { this.searchContent = 'all' }
    this.route.navigateByUrl('/home/' + this.searchContent);
    if (this.searchContent == 'all') {
      this.searchContent = '';
    }
  }
}
