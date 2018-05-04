import { Component, OnInit } from '@angular/core';
import { flyIn } from '../../animation/fly-in';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css'],
  animations: [flyIn]
})
export class LikeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
