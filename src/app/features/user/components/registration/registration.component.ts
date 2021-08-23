import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
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
    private regService: RegistrationService,
    private commonService: CommonService,
    private router: Router
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
    
      // debugger;

      if (!this.registrationForm.valid) 
      {
        this.commonService.toastWarning("Please Enter the mandatory fields");
        return;
      }
    
      // debugger;
      const dob = this.registrationForm.value.dob
      ? new Date(
          this.registrationForm.value.dob.year,
          this.registrationForm.value.dob.month - 1,
          this.registrationForm.value.dob.day
        )
      : null;
      let saveObj = {
        name:  this.registrationForm.value.name,
        email:  this.registrationForm.value.email,
        username:  this.registrationForm.value.username,
        phone:  this.registrationForm.value.phone,
        gender:  this.registrationForm.value.gender,
        dob: dob,
        password: this.registrationForm.value.password,
      }
      this.regService.saveUser(saveObj).subscribe(result => {
        // debugger;
        const responseData = JSON.parse(JSON.stringify(result));
        this.router.navigate(['/login']); 
      });
    }


}
