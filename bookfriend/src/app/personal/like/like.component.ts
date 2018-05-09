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
        this.list = data.json().data.like;
      }
    )
  }

}
