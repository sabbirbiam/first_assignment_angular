import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { User } from '../../model/user-model';
import { StoriesService } from '../../services/stories.services';

@Component({
  selector: 'app-story-create',
  templateUrl: './story-create.component.html',
  styleUrls: ['./story-create.component.css']
})
export class StoryCreateComponent implements OnInit {

  storyForm: FormGroup;
  loginUser: User;

  constructor(
    private commonService: CommonService,
    private fb: FormBuilder,
    private storiesService: StoriesService,
    private router: Router
  ) { 
    this.loginUser = new User();
  }
  ngOnInit(): void {
    this.loginUser = new User(JSON.parse(localStorage.getItem('user')));
    this.createStoryForm();
  }

  private createStoryForm(): void {
    this.storyForm = this.fb.group({
      title: ['', Validators.required],
      section: [''],
      tags: [''],
      story: [''],
      storycaption: [''],
      storyimage: [''],
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
      title: this.storyForm.value.title,
      section: this.storyForm.value.section,
      tags: this.storyForm.value.tags,
      story: this.storyForm.value.story,
      storycaption: this.storyForm.value.storycaption,
      storyimage: this.storyForm.value.storyimage,
      user_id: this.loginUser.id
    }

    this.storiesService.saveStories(saveObj).subscribe(result => {
      // debugger;
      const responseData = JSON.parse(JSON.stringify(result));
      if (responseData.message) {
        this.commonService.toastSuccess(responseData.message);
        this.storyForm.reset();
        this.router.navigate(['/stories']); 
      }
    });
  }

}
