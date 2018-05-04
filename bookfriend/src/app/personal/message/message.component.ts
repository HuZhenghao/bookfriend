import { Component, OnInit } from '@angular/core';
import { flyIn } from '../../animation/fly-in';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  animations: [flyIn]
})
export class MessageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
