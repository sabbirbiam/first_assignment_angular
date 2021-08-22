
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
@NgModule({
    declarations: [
        UserComponent,
        RegistrationComponent,
        LoginComponent,
        StoriesComponent,
        StoryCreateComponent,
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
