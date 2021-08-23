import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { DataComService } from 'src/app/shared/services/data-com.service';
import { Stories } from '../../model/stories-model';
import { User } from '../../model/user-model';
import { StoriesService } from '../../services/stories.services';

@Component({
  selector: 'app-story-home',
  templateUrl: './story-home.component.html',
  styleUrls: ['./story-home.component.css']
})
export class StoryHomeComponent implements OnInit {

  stroiesList: Stories[];
  loginUser: User;
  comments: String = "";

  serchValue = "";

  constructor(
    private storiesService: StoriesService,
    private dataCom: DataComService,
    private router: Router,
    private commonService: CommonService,
    private confirmationService: NgxBootstrapConfirmService,
    public  webStorageService: WebStorageService,

  ) {
    this.stroiesList = new Array<Stories>();
    this.loginUser = new User();
    // this.webStorageService.isAdmin();
  }

  ngOnInit(): void {
    this.getStories();
  }

  private getStories() {
    this.stroiesList = [];
    this.storiesService.getAllHomeStories().subscribe(result => {

      console.log("result", result);
      // debugger;
      if (result["response"].code == 200) {
        if (result["data"].length) {
          result["data"].map(ele => {
            this.stroiesList.push(new Stories(ele));
          })
        }
      }

      console.log("his.stroiesList", this.stroiesList);


    })
  }

  public getStoriesBySearch() {

    this.stroiesList = [];
    let obj ={
      serchValue: this.serchValue,
      type: this.loginUser.type
    }

    this.storiesService.getAllStoriesSearch(obj).subscribe(result => {

      console.log("result", result);
      // debugger;
      if (result["response"].code == 200) {
        if (result["data"].length) {
          result["data"].map(ele => {
            this.stroiesList.push(new Stories(ele));
          })
        }
      }

      console.log("his.stroiesList", this.stroiesList);


    })
  }


}
