import { Component, OnInit } from '@angular/core';
import { flyIn } from '../../animation/fly-in';
import { Http, Jsonp } from '@angular/http'

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css'],
  animations: [flyIn]
})
export class LikeComponent implements OnInit {
  user;
  myself;
  list;
  constructor(
    public http: Http
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('nowPerson'));
    this.myself = JSON.parse(localStorage.getItem('user'));
    this.http.get(`http://localhost:3000/users/getLike?id=${this.user._id}`)
      .subscribe(
        data => {
          let like = data.json().data.like;
          for (let i = 0; i < like.length; i++) {
            let time = new Date(like[i].id.createdAt);
            like[i].id.createdAt = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
          }
          this.list = like;
        }
      )
  }
  //取消关注
  dislike(i) {
    this.http.get(`http://localhost:3000/users/dislike?id=${this.list[i].id._id}&myid=${this.myself._id}`)
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
          this.list.splice(i,1);
          localStorage.setItem('user', JSON.stringify(this.myself));
        },
        error => {
          console.error(error)
        }
      )
  }

}
