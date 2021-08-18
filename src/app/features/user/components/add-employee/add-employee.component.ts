import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { CommonService } from 'src/app/shared/services/common.service';
import { EmployeeService } from '../../services/employee.services';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  public saveForm: FormGroup;
  public departmentList = [];
  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private commonService: CommonService,
    private router: Router,
    private confirmationService: NgxBootstrapConfirmService
  ) { 
    this.departmentList.push({TEXT: "Software", VALUE: 1});
    this.departmentList.push({TEXT: "HR", VALUE: 2});
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.saveForm = this.fb.group({ 
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: [''],
      department: [1],
      designation: [''],
      joiningDate: [''],
      dob: [''],
    });
  }

  /**
   * onSubmit
   */
  public onSubmit(): void {
    
    // debugger;
    if (!this.saveForm.valid) 
    {
      this.commonService.toastWarning("Please Enter the mandatory fields");
      return;
    }
    

    const firstName = this.saveForm.value.firstName;
    const middleName = this.saveForm.value.middleName;
    const lastName = this.saveForm.value.lastName;
    const designation = this.saveForm.value.designation;
    const department = this.saveForm.value.department;
    // debugger;
    const joiningDate = this.saveForm.value.joiningDate
    ? new Date(
        this.saveForm.value.joiningDate.year,
        this.saveForm.value.joiningDate.month - 1,
        this.saveForm.value.joiningDate.day
      )
    : null;
  const dob = this.saveForm.value.dob
    ? new Date(
        this.saveForm.value.dob.year,
        this.saveForm.value.dob.month - 1,
        this.saveForm.value.dob.day
      )
    : null;

    let saveObj = {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      designation: designation,
      department: department ? parseInt(department) : null ,
      joiningDate: joiningDate ? this.commonService.getDateDashFormate(joiningDate) : null,
      dob: dob ? this.commonService.getDateDashFormate(dob) : null,
    }
    this.employeeService.saveProject(saveObj).subscribe(result => {
      const responseData = JSON.parse(JSON.stringify(result));
      if (responseData.success) {
        this.commonService.toastSuccess(responseData.message);
        this.saveForm.reset();
        this.router.navigate(['/employee']); 
      }
    });
  }

}
