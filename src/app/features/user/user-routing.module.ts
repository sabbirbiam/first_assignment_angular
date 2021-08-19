
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { RegistrationComponent } from "./components/registration/registration.component";
import { LoginComponent } from "./components/login/login.component";


const routes: Routes = [
    {
        path: '', component: UserComponent,
        children: [
            { path: '', redirectTo: 'registration', pathMatch: 'full' },
            // { path: 'employee', component: EmployeeComponent },
            { path: 'login', component: LoginComponent },
            { path: 'registration', component: RegistrationComponent },
            // { path: 'employee/add', component: AddEmployeeComponent },
            // { path: 'employee/update', component: EditEmployeeComponent },
            // { path: 'leave', component: LeaveComponent },
            // { path: 'leave/add', component: AddLeaveComponent },
            // { path: 'leave/update', component: EditLeaveComponent },

        ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }