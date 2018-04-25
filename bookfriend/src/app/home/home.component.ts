import { Component, OnInit } from '@angular/core';
import { flyIn } from '../animation/fly-in';
import { Http } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [flyIn]
})
export class HomeComponent implements OnInit {
  posts = [];
  constructor(
    public http: Http
  ) { }

  ngOnInit() {
    this.http.get(`http://localhost:3000/post/getAll`)
    .subscribe(
      data => {
        this.posts = data.json().data;
      },
      error => {
        console.error(error);
      }
    )
  }

}
