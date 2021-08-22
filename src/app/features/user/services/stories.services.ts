import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/shared/base-data.services';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {

  constructor(private apiService: BaseDataService) { }
  
  public getAllStories(){
    // return this.apiService.get("employee/get-all-employee/12/14");
    return this.apiService.get(`stories/get-all-stories`);
  }
  
  public saveStories(params) {
    return this.apiService.request('POST', `stories/create-stories`, params);
  }

}
