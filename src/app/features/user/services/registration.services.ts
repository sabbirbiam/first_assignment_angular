import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/shared/base-data.services';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private apiService: BaseDataService) { }
  
  public getEmployeeist(){
    // return this.apiService.get("employee/get-all-employee/12/14");
    return this.apiService.get(`employee/get-all-employee`);
  }

  public getlist(){
    // return this.apiService.get("employee/get-all-employee/12/14");
    return this.apiService.get(`get-all`);
  }

  public getEmployeeistByPagination(pageIndex: number, pageSize: number){ 
    return this.apiService.get(`employee/get-all-employee-pagination/${pageIndex}/${pageSize}`);
  }

  public saveProject(params) {
    return this.apiService.request('POST', `employee/create-employee`, params);
  }

  public updateProject(params) {
    return this.apiService.request("PUT", 'employee/update-employee', params)
  }

  public deleteEmployee(id) {
    return this.apiService.request("DELETE", `employee/delete-employee-by-id/${id}`);
  } 
}
