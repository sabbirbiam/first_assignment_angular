import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';
import { DataComService } from 'src/app/shared/services/data-com.service';
import { EmployeeService } from '../../services/employee.services';
import { LeaveService } from '../../services/leave.services';

@Component({
  selector: 'app-edit-leave',
  templateUrl: './edit-leave.component.html',
  styleUrls: ['./edit-leave.component.css']
})
export class EditLeaveComponent implements OnInit, OnDestroy {

  public saveForm: FormGroup;
  public leaveTypeList = [];
  public employeeList = [];
  subscription: Subscription;

  constructor(
    private leaveService: LeaveService,
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private commonService: CommonService,
    private confirmationService: NgxBootstrapConfirmService,
    private dataCom: DataComService,
    private router: Router

  ) {
    this.leaveTypeList.push({TEXT: "Casual", VALUE: 1});
    this.leaveTypeList.push({TEXT: "Sick", VALUE: 2});
   }

  ngOnInit(): void {
    this.getEmployeeData();
    this.createForm();
    this.getPassedData();
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
      id: [''], 
      description: ['', Validators.required],
      strarDate: [''],
      endDate: [''],
      employeeId: [''],
      leaveType: [''], 
    });
  }

  /**
   * onSubmit
   */
   public onSubmit(): void {
    
    if (!this.saveForm.valid) return;

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
    const id = this.saveForm.value.id; 

    let saveObj = {
      id: id,
      employeeId: employeeId,
      description: description, 
      leaveType: leaveType ? parseInt(leaveType) : null ,
      endDate: endDate ? this.commonService.getDateDashFormate(endDate) : null,
      strarDate: strarDate ? this.commonService.getDateDashFormate(strarDate) : null,
    }
    this.leaveService.updateLeave(saveObj).subscribe(result => {
      const responseData = JSON.parse(JSON.stringify(result));
      if (responseData.success) {
        this.commonService.toastSuccess(responseData.message);
        this.saveForm.reset();
        this.router.navigate(['/leave']); 
        
        // this.getAllProject();
      }
    });
  }

  private getPassedData() {
    this.subscription = this.dataCom.getPassedItemData.subscribe((res) => {
      this.saveForm.patchValue({
        id: res.id,
        description: res.description, 
        leaveType: res.leaveType ? parseInt(res.leaveType) : '',
        designation: res.designation,
        employeeId: res.employeeId,
        strarDate: res.strarDate
          ? this.getDateSlash(new Date(res.strarDate))
          : null,
        endDate: res.endDate ? this.getDateSlash(new Date(res.endDate)) : null,
      });
      console.log('this.employeeForm.value', this.saveForm.value);
    });
  }

  getDateSlash(date) {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
