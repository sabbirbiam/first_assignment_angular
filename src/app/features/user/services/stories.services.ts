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
  
  public getAllStoriesUser(){
    // return this.apiService.get("employee/get-all-employee/12/14");
    return this.apiService.get(`stories/get-all-stories-user`);
  }


  public saveStories(params) {
    return this.apiService.request('POST', `stories/create-stories`, params);
  }

  public updateStories(params) {
    return this.apiService.request('POST', `stories/update-stories`, params);
  }

  public saveComments(params) {
    return this.apiService.request('POST', `stories/create-comments`, params);
  }

  public deleteComments(id) {
    return this.apiService.request("DELETE", `stories/delete-comment-by-id/${id}`);
  } 

  public deleteStory(id) {
    return this.apiService.request("DELETE", `stories/delete-stroy-by-id/${id}`);
  } 

  public unlistedStory(id) {
    return this.apiService.request("get", `stories/unlisted-stroy-by-id/${id}`);
  } 

}
