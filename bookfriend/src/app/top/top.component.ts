import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {
  searchContent;
  constructor(
    public loginService: LoginService
  ) { }

  ngOnInit() {
  }
  onSearch(e){

  }
}
