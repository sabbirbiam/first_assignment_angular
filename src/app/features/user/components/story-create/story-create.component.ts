import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  imageUrl: any;

  constructor(
    private commonService: CommonService,
    private fb: FormBuilder,
    private storiesService: StoriesService,
    private router: Router,
    private cd: ChangeDetectorRef
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

  /**
   * uploadFile
   */
  public uploadFile(event): void {

    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.storyForm.patchValue({
          storyimage: reader.result
        });
        // this.editFile = false;
        // this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();        
    }
    
  }

}
