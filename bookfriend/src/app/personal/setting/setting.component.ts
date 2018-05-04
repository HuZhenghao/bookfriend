import { Component, OnInit } from '@angular/core';
import { flyIn } from '../../animation/fly-in';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
  animations: [flyIn]
})
export class SettingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
