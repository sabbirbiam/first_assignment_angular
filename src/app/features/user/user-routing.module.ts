
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { EmployeeComponent } from "./components/employee/employee.component";
import { AddEmployeeComponent } from "./components/add-employee/add-employee.component";
import { EditEmployeeComponent } from "./components/edit-employee/edit-employee.component";
import { LeaveComponent } from "./components/leave/leave.component";
import { AddLeaveComponent } from "./components/add-leave/add-leave.component";
import { EditLeaveComponent } from "./components/edit-leave/edit-leave.component";


const routes: Routes = [
    {
        path: '', component: UserComponent,
        children: [
            { path: '', redirectTo: 'employee', pathMatch: 'full' },
            { path: 'employee', component: EmployeeComponent },
            { path: 'employee/add', component: AddEmployeeComponent },
            { path: 'employee/update', component: EditEmployeeComponent },
            { path: 'leave', component: LeaveComponent },
            { path: 'leave/add', component: AddLeaveComponent },
            { path: 'leave/update', component: EditLeaveComponent },

        ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }