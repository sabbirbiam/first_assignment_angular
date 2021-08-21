import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseDataService } from 'src/app/shared/base-data.services';
import { Registration } from '../model/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private apiService: BaseDataService) { }

  public authLogin(email, password) {
   let params = {
     email,
     password,
   };
    return this.apiService.request('post', `login`, params);
  }

  public createAccount(userData:Registration) {
    return this.apiService.request('POST', `Account/Register`, userData);
  }

  public createRegistrationModel(data: any = {}) {
    const registration: Registration = new Registration(data);
    return registration;
  }

  public checkPasswords(group: FormGroup) {
    const invalid = group.get('password').value !== group.get('confirmPassword').value;
    if (invalid) {
      if (!group.get('password').pristine) {
        group.get('password').markAsTouched();
        group.get('password').setErrors({ incorrect: "Password and Confirm Password not matched" });
      } else {
        group.get('confirmPassword').markAsTouched();
        group.get('confirmPassword').setErrors({ incorrect: "Password and Confirm Password not matched" });
      }
    } else {
      group.get('password').setErrors(null);
      group.get('confirmPassword').setErrors(null);
    }
    group.get('password').markAsPristine();
    group.get('confirmPassword').markAsPristine();
    return invalid ? { invalidPassword: true } : null;
  }
}