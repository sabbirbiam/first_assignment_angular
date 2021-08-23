import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public saveForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private commonService: CommonService,
    private webStorageService: WebStorageService
    ) { 

    }
  ngOnInit(): void {
    if (this.webStorageService.getCookie()) {
      this.router.navigate(['/']);
    }
    this.createForm();
  }

  private createForm(): void {
    this.saveForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(){
    if (!this.saveForm.valid)
      return;
    
    const formValue = this.saveForm.value
    this.authService.authLogin(formValue.email, formValue.password).subscribe(result=>{
      
      // debugger;
      // console.log("Console", result);
      
      // return;
        this.webStorageService.setCookie();
        this.webStorageService.saveToken(result["access_token"]);
        this.webStorageService.saveUser(result["user"]);
        // this.router.navigate(['/stories']);
        window.location.reload();


      // }else{
      //   this.commonService.toastError(responseData.message);
      // }
    });
  }

}
