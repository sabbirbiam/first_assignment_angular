import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { User } from '../../model/user-model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  loginUser: User;
  constructor(
    public webStorageService: WebStorageService,
    private router: Router
  ) {
    this.loginUser = new User();
  }

  ngOnInit(): void {
    this.loginUser = new User(this.webStorageService.getUser());
  }

  /**
   * updateUser
   */
  public updateUser() {
    this.router.navigate(['users/update']);
  }

}
