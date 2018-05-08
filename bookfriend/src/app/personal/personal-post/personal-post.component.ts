import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import { flyIn } from '../../animation/fly-in';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-personal-post',
  templateUrl: './personal-post.component.html',
  styleUrls: ['./personal-post.component.css'],
  animations: [flyIn]
})
export class PersonalPostComponent implements OnInit {
  user;
  posts = [];
  constructor(
    public http: Http,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    let that = this;
    this.route.url.subscribe(
      e => {
        setTimeout(function () {
          that.user = JSON.parse(localStorage.getItem('nowPerson'));
          that.http.get(`http://localhost:3000/post/getPeople?id=${that.user._id}`)
            .subscribe(
              data => {
                that.posts = data.json().data;
              },
              error => {
                console.error(error)
              }
            )
        }, 100)
      }
    )

  }
  ngAfterViewInit() {
  }

}
