import { Component, OnInit } from '@angular/core';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { CommonService } from 'src/app/shared/services/common.service';
import { User } from '../../model/user-model';
import { RegistrationService } from '../../services/registration.services';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public userList: User[];
  public userListSearch: User[];

  public _listFilter = '';



  constructor(
    private regService: RegistrationService,
    private confirmationService: NgxBootstrapConfirmService,
    private commonService: CommonService

  ) { 
    this.userList = new Array<User>();
    this.userListSearch = new Array<User>();
  }

  ngOnInit(): void {
    this.getAllUser();
  }

  private getAllUser() {
    
    this.regService.getAllUserlist().subscribe(result => {
      // debugger;
      this.userList = new Array<User>();
      this.userListSearch = new Array<User>();
      const responseData = JSON.parse(JSON.stringify(result));
      if(responseData.response.code ==  200) {
        responseData.data.map(ele => {
          this.userList.push(ele);
          this.userListSearch.push(ele);
        })
      }
    })
  }

  performFilter(filterBy: string): User[] {
    // debugger;
    filterBy = filterBy.toLocaleLowerCase();
    return this.userList.filter((user: User) => 
    user.name.toLocaleLowerCase().includes(filterBy)); 
  }

  get listFilter() {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.userListSearch = this.performFilter(value);
  }

  /**
   * onClickUserStatus
   */
  public onClickUserStatus(id): void {
    // debugger;
    // console.log("id", id);
    
    let options = {
      title: 'Sure you want to delete this PostComments?',
      confirmLabel: 'Yes',
      declineLabel: 'No'
    }
    // this.confirmationService.confirm("dd")
    this.confirmationService.confirm(options).then(res => {
      if (res) {
        this.regService.updateUserStatus(id).subscribe(result => {

          // debugger;
          // console.log("res", res);

          const responseData = JSON.parse(JSON.stringify(result));
          if (responseData.response.message) {
            this.commonService.toastSuccess(responseData.response.message);
            let user = this.userList.find(item => item.id == id);
            user.status = user.status == 1 ? 0 : 1;
          }
        })
      }

    })
  }

}
