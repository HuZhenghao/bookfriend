import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FileUploadModule } from 'ng2-file-upload';

import { PersonalComponent } from './personal.component';
import { personalRoutes } from './personal.routes';
import { LikeComponent } from './like/like.component';
import { MessageComponent } from './message/message.component';
import { PersonalPostComponent } from './personal-post/personal-post.component';
import { SettingComponent } from './setting/setting.component';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FileUploadModule,
    RouterModule.forChild(personalRoutes),
  ],
  declarations: [
    PersonalComponent,
    LikeComponent,
    MessageComponent,
    PersonalPostComponent,
    SettingComponent
  ]
})
export class PersonalModule { }
