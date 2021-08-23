
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { RegistrationComponent } from "./components/registration/registration.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "src/app/core/guard/auth-guard";
import { StoriesComponent } from "./components/stories/stories.component";
import { StoryCreateComponent } from "./components/story-create/story-create.component";
import { StoryEditComponent } from "./components/story-edit/story-edit.component";
import { UserListComponent } from "./components/user-list/user-list.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { UserInfoComponent } from "./components/user-info/user-info.component";
import { StoryHomeComponent } from "./components/story-home/story-home.component";


const routes: Routes = [
    {
        path: '', component: UserComponent,
        children: [
            { path: '', redirectTo: 'userinfo', pathMatch: 'full' },
            { path: 'logout',  component: LogoutComponent },
            { path: 'login', component: LoginComponent },
            { path: 'home', component: StoryHomeComponent },
            { path: 'registration', component: RegistrationComponent },
            { path: 'userinfo', canActivate: [AuthGuard], component: UserInfoComponent },
            { path: 'stories', canActivate: [AuthGuard], component: StoriesComponent },
            { path: 'stories/add', canActivate: [AuthGuard], component: StoryCreateComponent },
            { path: 'stories/edit', canActivate: [AuthGuard], component: StoryEditComponent },
            { path: 'users', canActivate: [AuthGuard], component: UserListComponent },

        ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }