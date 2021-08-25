import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { DataComService } from 'src/app/shared/services/data-com.service';
import { PostComments } from '../../model/commet-model';
import { Stories } from '../../model/stories-model';
import { User } from '../../model/user-model';
import { StoriesService } from '../../services/stories.services';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {

  stroiesList: Stories[];
  stroiesUserList: Stories[];
  stroiesAll: Stories[];
  loginUser: User;
  comments: String = "";

  serchValue = "";

  showuserstory: boolean = false;

  constructor(
    private storiesService: StoriesService,
    private dataCom: DataComService,
    private router: Router,
    private commonService: CommonService,
    private confirmationService: NgxBootstrapConfirmService,
    public webStorageService: WebStorageService,

  ) {
    this.stroiesList = new Array<Stories>();
    this.stroiesUserList = new Array<Stories>();
    this.stroiesAll = new Array<Stories>();
    this.loginUser = new User();
    // this.webStorageService.isAdmin();
  }

  ngOnInit(): void {

    if (this.webStorageService.isAdmin()) {
      this.getStories();
    } else if (this.webStorageService.isUser()) {
      this.getStoriesUser();
    } else {
      this.commonService.toastWarning("Invaild User");
    }
    this.loginUser = JSON.parse(localStorage.getItem('user'));
  }

  private getStories() {
    this.stroiesList = [];
    this.storiesService.getAllStories().subscribe(result => {

      console.log("result", result);
      // debugger;
      if (result["response"].code == 200) {
        if (result["data"].length) {
          result["data"].map(ele => {
            this.stroiesList.push(new Stories(ele));
            this.stroiesAll.push(new Stories(ele));
          })
        }
      }

      console.log("his.stroiesList", this.stroiesList);


    })
  }

  private getStoriesUser() {
    this.stroiesList = [];
    this.stroiesAll = [];
    this.storiesService.getAllStoriesUser().subscribe(result => {

      console.log("result", result);
      // debugger;
      if (result["response"].code == 200) {
        if (result["data"].length) {
          result["data"].map(ele => {
            this.stroiesList.push(new Stories(ele));
            this.stroiesAll.push(new Stories(ele));
          })
        }
      }

      console.log("his.stroiesList", this.stroiesList);


    })
  }


  public onClickEdit(row) {

    console.log("row", row);
    this.dataCom.setPassedItemData(row);
    this.router.navigate(['/stories/edit']);
  }

  /**
   * onClickSaveComment
   */
  public onClickSaveComment(story: Stories) {

    console.log("story", story);

    if (!this.comments) {
      this.commonService.toastWarning("Comment Can not be null");
      return;
    }

    if (!story.user.id) {
      this.commonService.toastWarning("Corrupted Data");
      return;
    }
    console.log("Story", story);

    let saveObj = {
      user_id: story.user.id,
      story_id: story.id,
      comments: this.comments
    }

    this.storiesService.saveComments(saveObj).subscribe(result => {
      // debugger;
      const responseData = JSON.parse(JSON.stringify(result));
      if (responseData.message) {
        this.commonService.toastSuccess(responseData.message);
        this.comments = "";
        // story.comment.push()
        this.getStories();
        // this.router.navigate(['/stories']); 
      }
    });

  }

  public onClickDeleteComment(story: Stories, comments: PostComments[], id): void {

    // debugger;
    console.log("comments", comments);

    // return;

    let options = {
      title: 'Sure you want to delete this PostComments?',
      confirmLabel: 'Yes',
      declineLabel: 'No'
    }
    // this.confirmationService.confirm("dd")
    this.confirmationService.confirm(options).then(res => {
      if (res) {
        this.storiesService.deleteComments(id).subscribe(result => {

          // debugger;
          // console.log("res", res);

          const responseData = JSON.parse(JSON.stringify(result));
          if (responseData.response.message) {
            this.commonService.toastSuccess(responseData.response.message);
            this.comments = "";
            comments = comments.filter(item => item.id !== id);
            console.log("Comments", comments);
            story.comment = comments;
            // story.comment.push()
            // this.getStories();
            // this.router.navigate(['/stories']); 
          }
        })
      }

    })
  }

  public onClickDeleteStory(id): void {

    let options = {
      title: 'Do you want to delete Story?',
      confirmLabel: 'Yes',
      declineLabel: 'No'
    }
    // this.confirmationService.confirm("dd")
    this.confirmationService.confirm(options).then(res => {
      if (res) {
        this.storiesService.deleteStory(id).subscribe(result => {

          const responseData = JSON.parse(JSON.stringify(result));
          if (responseData.response.message) {
            this.commonService.toastSuccess(responseData.response.message);
            this.stroiesList = this.stroiesList.filter(item => item.id !== id);
          }
        })
      }

    })
  }

  public onClickMarkAsUnlisted(id): void {

    let options = {
      title: 'Do you Unlisted Story?',
      confirmLabel: 'Yes',
      declineLabel: 'No'
    }
    // this.confirmationService.confirm("dd")
    this.confirmationService.confirm(options).then(res => {
      if (res) {
        this.storiesService.unlistedStory(id).subscribe(result => {

          const responseData = JSON.parse(JSON.stringify(result));
          if (responseData.response.message) {
            this.commonService.toastSuccess(responseData.response.message);
            let story = this.stroiesList.find(item => item.id == id);
            story.blocked = story.blocked == 1 ? 0 : 1;
          }
        })
      }

    })
  }

  public getStoriesBySearch() {

    this.stroiesList = [];
    let obj = {
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

  /**
   * onClickChngeStory
   */
  public onClickChngeStory(): void {

    // debugger;
    if (this.showuserstory) {
      this.stroiesUserList = [];
      this.stroiesAll.map(ele => {
        if (ele.user_id == this.loginUser.id) {
          this.stroiesUserList.push(ele);
        }

      })
      this.stroiesList = [];
      this.stroiesList = this.stroiesUserList;
    }else {
      this.stroiesList = [];
      this.stroiesList = this.stroiesAll;
    }
  }

}
