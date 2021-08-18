import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { CommonService } from 'src/app/shared/services/common.service';
import { EmployeeService } from '../../services/employee.services';
import { LeaveService } from '../../services/leave.services';

@Component({
  selector: 'app-add-leave',
  templateUrl: './add-leave.component.html',
  styleUrls: ['./add-leave.component.css']
})
export class AddLeaveComponent implements OnInit {

  public saveForm: FormGroup;
  public leaveTypeList = [];
  public employeeList = [];
  
  constructor(
    private leaveService: LeaveService,
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private commonService: CommonService,
    private confirmationService: NgxBootstrapConfirmService,
    private router: Router
  ) {
    this.leaveTypeList.push({TEXT: "Casual", VALUE: 1});
    this.leaveTypeList.push({TEXT: "Sick", VALUE: 2});
   }

   ngOnInit(): void {
    this.getEmployeeData();
    this.createForm();
  }

  private getEmployeeData(): void {
    
    this.employeeList.length = 0;
    this.employeeService.getEmployeeist().subscribe(result => {
      console.log("Result ", result);
      // debugger;
      if(result['success']) {
        this.employeeList = result['data']
      } 
      
    })
  }

  private createForm(): void {
    this.saveForm = this.fb.group({
      // id: [''], 
      description: ['', Validators.required],
      strarDate: [''],
      endDate: [''],
      employeeId: [''],
      leaveType: [1], 
    });
  }

  /**
   * onSubmit
   */
   public onSubmit(): void {
    
    if (!this.saveForm.valid) 
    {
      this.commonService.toastWarning("Please Enter the mandatory fields");
      return;
    }

    const description = this.saveForm.value.description;
    const strarDate = this.saveForm.value.strarDate
    ? new Date(
        this.saveForm.value.strarDate.year,
        this.saveForm.value.strarDate.month - 1,
        this.saveForm.value.strarDate.day
      )
    : null;
    const endDate = this.saveForm.value.endDate
    ? new Date(
        this.saveForm.value.endDate.year,
        this.saveForm.value.endDate.month - 1,
        this.saveForm.value.endDate.day
      )
    : null;
    const leaveType = this.saveForm.value.leaveType; 
    const employeeId = this.saveForm.value.employeeId; 
    if (!employeeId) 
    {
      this.commonService.toastWarning("Please Select a employee");
      return;
    }

    let saveObj = {
      employeeId: employeeId,
      description: description, 
      leaveType: leaveType ? parseInt(leaveType) : null ,
      endDate: endDate ? this.commonService.getDateDashFormate(endDate) : null,
      strarDate: strarDate ? this.commonService.getDateDashFormate(strarDate) : null,
    }
    this.leaveService.saveLeave(saveObj).subscribe(result => {
      const responseData = JSON.parse(JSON.stringify(result));
      if (responseData.success) {
        this.commonService.toastSuccess(responseData.message);
        this.saveForm.reset();
        this.router.navigate(['/leave']); 
      }
    });
  }

}
