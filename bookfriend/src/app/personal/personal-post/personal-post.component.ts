import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { flyIn } from '../../animation/fly-in';

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
    public http: Http
  ) { }

  ngOnInit() {
    let that = this;
    setTimeout(function () {
      that.user = JSON.parse(localStorage.getItem('nowPerson'));
      console.log(that.user.username);
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

}
