import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { CommonService } from 'src/app/shared/services/common.service';
import { DataComService } from 'src/app/shared/services/data-com.service';
import { Employee } from '../../model/employee-model';
import { EmployeeService } from '../../services/employee.services';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public employeeList = [];
  public employeeListSearch = [];

  pageIndex: number = 1;
  pageSize: number = 2;

  private _listFilter = '';

  constructor(
    private employeeService: EmployeeService,
    private dataCom: DataComService,
    private router: Router,
    private confirmationService: NgxBootstrapConfirmService,
    private commonService: CommonService
  ) {

  }

  get listFilter() {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.employeeListSearch = this.performFilter(value);
  }

  ngOnInit(): void {

    // this.getAllEmployee();
  }

  performFilter(filterBy: string): Employee[] {
    // debugger;
    filterBy = filterBy.toLocaleLowerCase();
    return this.employeeList.filter((employee: Employee) => 
    employee.firstName.toLocaleLowerCase().includes(filterBy));
    // return this.employeeList.filter((employee: Employee) => {
    //   employee.firstName.toLocaleLowerCase().includes(filterBy); 
    // })
  }


  private getAllEmployee(): void {

    this.employeeList.length = 0;
    this.employeeService.getEmployeeist().subscribe(result => {
      console.log("Result ", result);
      // debugger;
      if (result['success']) {
        result['data'].map(e => {
          this.employeeList.push(new Employee(e));
          this.employeeListSearch.push(new Employee(e));
        });
      }

      console.log("this.employeeList", this.employeeList);

    })
  }

  onClickEdit(row) {

    console.log("row", row);
    this.dataCom.setPassedItemData(row);
    this.router.navigate(['/employee/update']);
  }

  /**
   * onClickDelete
   */
  public onClickDelete(id, i): void {

    let options = {
      title: 'Sure you want to delete this Leave?',
      confirmLabel: 'Yes',
      declineLabel: 'No'
    }
    // this.confirmationService.confirm("dd")
    this.confirmationService.confirm(options).then(res => {
      if (res) {
        this.employeeService.deleteEmployee(id).subscribe(res => {

          // debugger;
          if (res["success"]) {
            this.employeeList = this.employeeList.filter(item => item.id !== id);
            this.employeeListSearch = this.employeeListSearch.filter(item => item.id !== id);

          }
        })
      }

    })
  }

  /**
   * onClickSearchEmployee
   */
  public onClickSearchEmployee(): void {

    if (this.pageIndex <= 0) {
      this.commonService.toastInfo("Page Index must be gether than zero");
      return;
    }

    if (this.pageSize <= 0) {
      this.commonService.toastInfo("Page Size must be gether than zero");
      return;
    }

    this.employeeList.length = 0;
    this.employeeListSearch.length = 0;

    this.employeeService.getEmployeeistByPagination(this.pageIndex, this.pageSize).subscribe(result => {

      if (result['success']) {
        result['data'].map(e => {
          this.employeeList.push(new Employee(e));
          this.employeeListSearch.push(new Employee(e));
        });
      }

    })
  }

}
