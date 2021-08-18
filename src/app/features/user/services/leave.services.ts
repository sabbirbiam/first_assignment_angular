import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/shared/base-data.services';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private apiService: BaseDataService) { }
  
  public getLeaveList(){
    return this.apiService.get(`leave/get-all-leaves`);
  }

  public saveLeave(params) {
    return this.apiService.request('POST', `leave/create-leave`, params);
  }

  public getLeaveByPagination(pageIndex: number, pageSize: number){ 
    return this.apiService.get(`leave/get-all-leave-pagination/${pageIndex}/${pageSize}`);
  }

  public updateLeave(params) {
    return this.apiService.request("PUT", 'leave/update-leave', params)
  }

  public deleteLeave(id) {
    return this.apiService.request("DELETE", `leave/delete-leave-by-id/${id}`);
  }
}
