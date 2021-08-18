import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { CommonService } from 'src/app/shared/services/common.service';
import { DataComService } from 'src/app/shared/services/data-com.service';
import { Leave } from '../../model/leave-model';
import { LeaveService } from '../../services/leave.services';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {

  leaveList = [];
  leaveListSearch = [];
  pageIndex: number = 1;
  pageSize: number = 2;
  private _listFilter = '';

  constructor(
    private leaveService: LeaveService,
    private dataCom: DataComService,
    private router: Router,
    private confirmationService: NgxBootstrapConfirmService,
    private commonService: CommonService

  ) { }

  ngOnInit(): void {
    // this.getAllLeave();
  }

  get listFilterSearch() {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.leaveListSearch = this.performFilter(value);
  }

  performFilter(filterBy: string): Leave[] {
    // debugger;
    filterBy = filterBy.toLocaleLowerCase();
    return this.leaveList.filter((leave: Leave) => 
    leave.description.toLocaleLowerCase().includes(filterBy));
    // return this.employeeList.filter((employee: Employee) => {
    //   employee.firstName.toLocaleLowerCase().includes(filterBy); 
    // })
  }


  private getAllLeave(): void {

    this.leaveList.length = 0;
    this.leaveService.getLeaveList().subscribe(result => {
      console.log("Result ", result);
      // debugger;
      if(result['success']) {
        result['data'].map(e => {
          this.leaveList.push(new Leave(e))
        });
      } 
      
    })
  }

  /**
   * onClickEdit
   */
  public onClickEdit(row): void {
    
    console.log("leave row", row);
    this.dataCom.setPassedItemData(row);
    this.router.navigate(['/leave/update']);
  }

   /**
   * onClickDelete
   */
    public onClickDelete(id, i): void {

      let options = {
        title: 'Sure you want to delete this Emloyee?',
        confirmLabel: 'Yes',
        declineLabel: 'No'
      }
      // this.confirmationService.confirm("dd")
      this.confirmationService.confirm(options).then(res => {
        if (res) {
          this.leaveService.deleteLeave(id).subscribe(res => {
  
            // debugger;
            if (res["success"]) {
              this.leaveList = this.leaveList.filter(item => item.id !== id);
              this.leaveListSearch = this.leaveListSearch.filter(item => item.id !== id);
            }
          })
        }
  
      })
    }

    /**
   * onClickSearchEmployee
   */
  public onClickSearchEmployee(): void {

    if(this.pageIndex <= 0) {
      this.commonService.toastInfo("Page Index must be gether than zero");
      return;
    }

    if(this.pageSize <= 0) {
      this.commonService.toastInfo("Page Size must be gether than zero");
      return;
    }

    this.leaveList.length = 0;
    this.leaveListSearch.length = 0;

    this.leaveService.getLeaveByPagination(this.pageIndex, this.pageSize).subscribe(result => {

      if(result['success']) {
        result['data'].map(e => {
          this.leaveList.push(new Leave(e));
          this.leaveListSearch.push(new Leave(e));
        });
      } 

    })
  }

}
