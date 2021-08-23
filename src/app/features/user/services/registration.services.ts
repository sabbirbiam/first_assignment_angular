import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/shared/base-data.services';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private apiService: BaseDataService) { }

  public getlist() {
    return this.apiService.get(`get-all`);
  }

  public getAllUserlist() {
    return this.apiService.get(`get-all-user`);
  }

  public updateUserStatus(id) {
    return this.apiService.get(`update-user-status/${id}`);
  }

  public saveUser(params) {
    return this.apiService.request('POST', `register`, params);
  }


}
