import { Component, OnInit } from '@angular/core';
import { WebStorageService } from 'src/app/core/services/web-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( ) { }
  username = "";
  usernameType = "";
  ngOnInit(): void {
    // this.username = this.webStorageService.getUser().username;
    // console.log("username", this.username);
    // if(this.webStorageService.isAdmin()){
    //   this.usernameType = "Admin"; 
    // }else{
    //   this.usernameType = "User";
    // }
  }

}
