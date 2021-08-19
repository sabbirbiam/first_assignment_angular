import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../../services/registration.services';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private regService: RegistrationService
  ) { }

  ngOnInit(): void {
    this.createRegistrationForm();
  }

  private createRegistrationForm(): void {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: [''],
      phone: [''],
      gender: [1],
      username: [''],
      dob: [''],
      password: [''],
      cpassword:['']
    });
  }

    /**
   * onSubmit
   */
     public onSubmit(): void {
    
      this.regService.getlist().subscribe(result => {
        debugger;
        console.log("result", result);
        
      })
      // debugger;
    //   if (!this.saveForm.valid) 
    //   {
    //     this.commonService.toastWarning("Please Enter the mandatory fields");
    //     return;
    //   }
      
  
    //   const firstName = this.saveForm.value.firstName;
    //   const middleName = this.saveForm.value.middleName;
    //   const lastName = this.saveForm.value.lastName;
    //   const designation = this.saveForm.value.designation;
    //   const department = this.saveForm.value.department;
    //   // debugger;
    //   const joiningDate = this.saveForm.value.joiningDate
    //   ? new Date(
    //       this.saveForm.value.joiningDate.year,
    //       this.saveForm.value.joiningDate.month - 1,
    //       this.saveForm.value.joiningDate.day
    //     )
    //   : null;
    // const dob = this.saveForm.value.dob
    //   ? new Date(
    //       this.saveForm.value.dob.year,
    //       this.saveForm.value.dob.month - 1,
    //       this.saveForm.value.dob.day
    //     )
    //   : null;
  
    //   let saveObj = {
    //     firstName: firstName,
    //     middleName: middleName,
    //     lastName: lastName,
    //     designation: designation,
    //     department: department ? parseInt(department) : null ,
    //     joiningDate: joiningDate ? this.commonService.getDateDashFormate(joiningDate) : null,
    //     dob: dob ? this.commonService.getDateDashFormate(dob) : null,
    //   }
    //   this.employeeService.saveProject(saveObj).subscribe(result => {
    //     const responseData = JSON.parse(JSON.stringify(result));
    //     if (responseData.success) {
    //       this.commonService.toastSuccess(responseData.message);
    //       this.saveForm.reset();
    //       this.router.navigate(['/employee']); 
    //     }
    //   });
    }


}
