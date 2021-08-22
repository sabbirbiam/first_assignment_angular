import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';
import { DataComService } from 'src/app/shared/services/data-com.service';
import { User } from '../../model/user-model';
import { StoriesService } from '../../services/stories.services';

@Component({
  selector: 'app-story-edit',
  templateUrl: './story-edit.component.html',
  styleUrls: ['./story-edit.component.css']
})
export class StoryEditComponent implements OnInit {

  storyForm: FormGroup;
  loginUser: User;
  subscription: Subscription;


  constructor(
    private commonService: CommonService,
    private fb: FormBuilder,
    private storiesService: StoriesService,
    private router: Router,
    private dataCom: DataComService
  ) {
    this.loginUser = new User();
  }

  ngOnInit(): void {
    this.loginUser = new User(JSON.parse(localStorage.getItem('user')));
    this.createStoryForm();
    this.getPassedData();
  }

  private createStoryForm(): void {
    this.storyForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      section: [''],
      tags: [''],
      story: [''],
      storycaption: [''],
      storyimage: [''],
    });
  }


  private getPassedData() {
    this.subscription = this.dataCom.getPassedItemData.subscribe((res) => {
      this.storyForm.patchValue({
        id: res.id,
        title: res.title,
        section: res.section,
        tags: res.tags,
        story: res.story,
        storycaption: res.storycaption,
        storyimage: res.storyimage,
        user_id: res.user_id,
      });
      console.log('this.storyForm.value', this.storyForm.value);
    });
  }

  /**
   * onSubmit
   */
  public onSubmit(): void {

    if (!this.storyForm.valid) {
      this.commonService.toastWarning("Please Enter the mandatory fields");
      return;
    }

    let saveObj = {
      id: this.storyForm.value.id,
      title: this.storyForm.value.title,
      section: this.storyForm.value.section,
      tags: this.storyForm.value.tags,
      story: this.storyForm.value.story,
      storycaption: this.storyForm.value.storycaption,
      storyimage: this.storyForm.value.storyimage,
      user_id: this.loginUser.id
    }

    this.storiesService.updateStories(saveObj).subscribe(result => {
      // debugger;
      const responseData = JSON.parse(JSON.stringify(result));
      if (responseData.response.message) {
        this.commonService.toastSuccess(responseData.response.message);
        this.storyForm.reset();
        this.router.navigate(['/stories']);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
