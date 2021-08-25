
import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { CommonModule } from '@angular/common';
import { StructureModule } from '../structure/structure.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxBootstrapConfirmModule } from 'ngx-bootstrap-confirm';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { StoriesComponent } from './components/stories/stories.component';
import { StoryCreateComponent } from './components/story-create/story-create.component';
import { StoryEditComponent } from './components/story-edit/story-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { LogoutComponent } from './components/logout/logout.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { StoryHomeComponent } from './components/story-home/story-home.component';
import { UserupdateComponent } from './components/userupdate/userupdate.component';
@NgModule({
    declarations: [
        UserComponent,
        RegistrationComponent,
        LoginComponent,
        StoriesComponent,
        StoryCreateComponent,
        StoryEditComponent,
        UserListComponent,
        LogoutComponent,
        UserInfoComponent,
        StoryHomeComponent,
        UserupdateComponent,
    ],
    imports: [
        CommonModule,   
        StructureModule,
        UserRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgxBootstrapConfirmModule,
        ChartsModule,
        NgbModule
    ],
    providers: [],
    bootstrap: [UserComponent]
})
export class UserModule { }
