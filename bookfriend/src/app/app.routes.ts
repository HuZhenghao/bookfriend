import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PersonalComponent } from './personal/personal.component';
import { LoginComponent } from './login/login.component';
import { AddpostComponent } from './addpost/addpost.component';
import { PostComponent } from './post/post.component';

export const appRoutes = [
    { path: '', redirectTo: 'home/all', pathMatch: 'full' },
    { path: 'post/:postId', component: PostComponent },
    { path: 'home/:content', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'addpost', component: AddpostComponent },
    { path: 'personal/:name', loadChildren: './personal/personal.module#PersonalModule' },
]
