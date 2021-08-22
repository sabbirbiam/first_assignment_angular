import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataComService } from 'src/app/shared/services/data-com.service';
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
  loginUser: User;
  constructor(
    private storiesService: StoriesService,
    private dataCom: DataComService,
    private router: Router
  ) {
    this.stroiesList = new Array<Stories>();
    this.loginUser = new User();
  }

  ngOnInit(): void {
    this.getStories();
    // debugger;
    this.loginUser = JSON.parse(localStorage.getItem('user'));
  }

  private getStories() {

    this.storiesService.getAllStories().subscribe(result => {

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

  public onClickEdit(row) {

    console.log("row", row);
    this.dataCom.setPassedItemData(row);
    this.router.navigate(['/stories/edit']);
  }

}
