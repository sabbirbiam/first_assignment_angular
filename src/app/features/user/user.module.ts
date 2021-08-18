
import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { CommonModule } from '@angular/common';
import { StructureModule } from '../structure/structure.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxBootstrapConfirmModule } from 'ngx-bootstrap-confirm';
import { ChartsModule } from 'ng2-charts';
import { EmployeeComponent } from './components/employee/employee.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LeaveComponent } from './components/leave/leave.component';
import { AddLeaveComponent } from './components/add-leave/add-leave.component';
import { EditLeaveComponent } from './components/edit-leave/edit-leave.component';
@NgModule({
    declarations: [
        UserComponent,
        EmployeeComponent,
        AddEmployeeComponent,
        EditEmployeeComponent,
        LeaveComponent,
        AddLeaveComponent,
        EditLeaveComponent,
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
