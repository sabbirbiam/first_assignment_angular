import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';
import { DataComService } from 'src/app/shared/services/data-com.service';
import { EmployeeService } from '../../services/employee.services';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit, OnDestroy {
  public employeeForm: FormGroup;
  public departmentList = [];
  subscription: Subscription;
  model: NgbDateStruct;

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private commonService: CommonService,
    private confirmationService: NgxBootstrapConfirmService,
    private dataCom: DataComService,
    private router: Router,
  ) {
    this.departmentList.push({ TEXT: 'Software', VALUE: 1 });
    this.departmentList.push({ TEXT: 'HR', VALUE: 2 });
  }

  ngOnInit(): void {
    this.createForm();
    this.getPassedData();
  }

  private createForm(): void {
    this.employeeForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: [''],
      department: [''],
      designation: [''],
      joiningDate: [''],
      dob: [''],
    });
  }

  private getPassedData() {
    this.subscription = this.dataCom.getPassedItemData.subscribe((res) => {
      this.employeeForm.patchValue({
        id: res.id,
        firstName: res.firstName,
        middleName: res.middleName,
        lastName: res.lastName,
        department: res.department ? parseInt(res.department) : '',
        designation: res.designation,
        joiningDate: res.joiningDate
          ? this.getDateSlash(new Date(res.joiningDate))
          : null,
        dob: res.dob ? this.getDateSlash(new Date(res.dob)) : null,
      });
      console.log('this.employeeForm.value', this.employeeForm.value);
    });
  }

  getDateSlash(date) {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  }

  /**
   * onSubmit
   */
  public onSubmit(): void {

    if (!this.employeeForm.valid) {
      this.commonService.toastWarning("Please Enter the mandatory fields");
      return;
    }


    // debugger;
    const id = this.employeeForm.value.id;
    if (!this.employeeForm.valid) {
      this.commonService.toastWarning("Please Enter the mandatory fields");
      return;
    }
    const firstName = this.employeeForm.value.firstName;
    const middleName = this.employeeForm.value.middleName;
    const lastName = this.employeeForm.value.lastName;
    const designation = this.employeeForm.value.designation;
    const department = this.employeeForm.value.department;
    // debugger;
    const joiningDate = this.employeeForm.value.joiningDate
      ? new Date(
        this.employeeForm.value.joiningDate.year,
        this.employeeForm.value.joiningDate.month - 1,
        this.employeeForm.value.joiningDate.day
      )
      : null;
    const dob = this.employeeForm.value.dob
      ? new Date(
        this.employeeForm.value.dob.year,
        this.employeeForm.value.dob.month - 1,
        this.employeeForm.value.dob.day
      )
      : null;

    let saveObj = {
      id: id,
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      designation: designation,
      department: department ? parseInt(department) : null,
      joiningDate: joiningDate
        ? this.commonService.getDateDashFormate(joiningDate)
        : null,
      dob: dob ? this.commonService.getDateDashFormate(dob) : null,
    };
    this.employeeService.updateProject(saveObj).subscribe((result) => {
      const responseData = JSON.parse(JSON.stringify(result));
      if (responseData.success) {
        this.commonService.toastSuccess(responseData.message);
        this.employeeForm.reset();
        this.router.navigate(['/employee']);
      }
    });
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
