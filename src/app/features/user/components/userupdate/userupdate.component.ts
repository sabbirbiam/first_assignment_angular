import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { User } from '../../model/user-model';
import { RegistrationService } from '../../services/registration.services';

@Component({
  selector: 'app-userupdate',
  templateUrl: './userupdate.component.html',
  styleUrls: ['./userupdate.component.css']
})
export class UserupdateComponent implements OnInit {

  public registrationForm: FormGroup;

  public loginUser: User;

  constructor(
    private fb: FormBuilder,
    private regService: RegistrationService,
    private commonService: CommonService,
    private router: Router,
    public webStorService: WebStorageService,
  ) {
    this.loginUser = new User();
    this.loginUser = new User(this.webStorService.getUser());
  }

  ngOnInit(): void {
    this.createRegistrationForm();
  }

  private createRegistrationForm(): void {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: [''],
      gender: [1],
      username: [''],
    });
    this.setValue();
  }

  private setValue() {

    this.registrationForm.patchValue({
      id: this.loginUser.id,
      name: this.loginUser.name,
      email: this.loginUser.email,
      username: this.loginUser.username,
      // dob: this.loginUser.dob ? new Date(this.loginUser.dob) : null,
      gender: this.loginUser.gender ? this.loginUser.gender : 1,
    });
  }

  /**
 * onSubmit
 */
  public onSubmit(): void {

    // debugger;

    if (!this.registrationForm.valid) {
      this.commonService.toastWarning("Please Enter the mandatory fields");
      return;
    }

    // debugger;

    let saveObj = {
      // id  : this.registrationForm.value.id,
      name: this.registrationForm.value.name,
      email: this.registrationForm.value.email,
      username: this.registrationForm.value.username,
      gender: this.registrationForm.value.gender,
    }
    let id = this.loginUser.id;
    this.regService.updateUser(saveObj, id).subscribe(result => {
      // debugger;
      const responseData = JSON.parse(JSON.stringify(result));
      if (responseData.response.message) {
        this.commonService.toastSuccess(responseData.response.message);
        this.router.navigate(['/logout']);
      }
    });
  }

}
