import { RouterModule } from '@angular/router';

import { PersonalComponent } from './personal.component';
import { LikeComponent } from './like/like.component';
import { MessageComponent } from './message/message.component';
import { PersonalPostComponent } from './personal-post/personal-post.component';
import { SettingComponent } from './setting/setting.component';

export const personalRoutes = [
    {
        path: '',
        component: PersonalComponent,
        children: [
            {
                path: '',
                redirectTo: 'personal-post',
                pathMatch: 'full'
            },
            {
                path: 'like',
                component: LikeComponent
            },
            {
                path: 'message',
                component: MessageComponent,
            },
            {
                path: 'personal-post',
                component: PersonalPostComponent,
            },
            {
                path: 'setting',
                component: SettingComponent
            }
        ]
    },

]
