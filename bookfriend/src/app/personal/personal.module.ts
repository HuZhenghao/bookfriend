import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { PersonalComponent } from './personal.component';
import { personalRoutes } from './personal.routes';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    RouterModule.forChild(personalRoutes),
  ],
  declarations: [
    PersonalComponent
  ]
})
export class PersonalModule { }
