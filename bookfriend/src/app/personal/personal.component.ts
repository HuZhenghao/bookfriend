import { Component, OnInit } from '@angular/core';
import { flyIn } from '../animation/fly-in';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
  animations: [flyIn]
})
export class PersonalComponent implements OnInit {
  user;
  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
  }

}
