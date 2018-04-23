import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PersonalComponent } from './personal/personal.component';
import { LoginComponent } from './login/login.component';

export const appRoutes = [
    { path: '', component: HomeComponent},
    { path: 'personal', component: PersonalComponent},
    { path: 'login', component: LoginComponent}
]