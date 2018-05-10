import { Component, OnInit } from '@angular/core';
import { flyIn } from '../animation/fly-in';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [flyIn]
})
export class HomeComponent implements OnInit {
  posts = [];
  content;
  constructor(
    public http: Http,
    public loginService: LoginService,
    public router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.params.subscribe(
      params => {
        this.content = params["content"];
        if (this.content == "all") {
          this.content = "";
        }
        this.http.get(`http://localhost:3000/post/searchPosts?type=${this, this.loginService.searchType}&content=${this.content}`)
          .subscribe(
            data => {
              this.posts = data.json().data;
              for (let i = 0; i < this.posts.length; i++) {
                let time = new Date(this.posts[i].createdAt);
                this.posts[i].createdAt = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}`;
              }
            },
            error => {
              console.error(error);
            }
          )
      }
    )
  }

}
