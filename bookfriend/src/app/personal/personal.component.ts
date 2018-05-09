import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { flyIn } from '../animation/fly-in';
import { Http } from '@angular/http';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
  animations: [flyIn]
})
export class PersonalComponent implements OnInit {
  user = {
    "avatar": "/img/defaultAvatar.png",
    "like": [],
    "message": [],
    "_id": "5aec26160ecebe35d46c5151",
    "username": "hzh1",
    "password": "123456",
    "createdAt": "2018-05-04T09:21:26.118Z",
    "updatedAt": "2018-05-04T09:21:26.118Z",
    "__v": 0
  };
  myself;
  name;
  isLike = false;
  constructor(
    public router: ActivatedRoute,
    public route: Router,
    public http: Http
  ) { }

  ngOnInit() {
    this.myself = JSON.parse(localStorage.getItem('user'));
    this.router.params.subscribe(
      params => {
        this.name = params['name'];
        this.http.get(`http://localhost:3000/users/getUserByName?name=${this.name}`)
          .subscribe(
            data => {
              this.user = data.json().data;
              localStorage.removeItem('nowPerson');
              localStorage.setItem('nowPerson', JSON.stringify(this.user));
              for (let i = 0; i < this.myself.like.length; i++) {
                console.log(this.myself.like)
                if (this.myself.like[i].id) {
                  if (this.myself.like[i].id == this.user._id) {
                    this.isLike = true;
                  }
                }
              }
            },
            e => {
              console.error(e)
            }
          )
      }
    )
  }
  //关注
  like() {
    this.http.get(`http://localhost:3000/users/like?id=${this.user._id}&myid=${this.myself._id}`)
      .subscribe(
        data => {
          this.myself.like.push({id: this.user._id});
          localStorage.setItem('user', JSON.stringify(this.myself));
          this.isLike = true;
        },
        error => {
          console.error(error)
        }
      )
  }
  //取消关注
  dislike() {
    this.http.get(`http://localhost:3000/users/dislike?id=${this.user._id}&myid=${this.myself._id}`)
      .subscribe(
        data => {
          let length = this.myself.like.length;
          for (let i = 0; i < length; i++) {
            if (this.myself.like[i].id = this.user._id) {
              this.myself.like.splice(i, 1);
              i--;
              length--;
            }
          }
          console.log(this.myself);
          localStorage.setItem('user', JSON.stringify(this.myself));
          this.isLike = false;
        },
        error => {
          console.error(error)
        }
      )
  }


}
