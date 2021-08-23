import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebStorageService } from 'src/app/core/services/web-storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private webStorageService: WebStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.webStorageService.removeCookie();
    this.webStorageService.removeUserData();
    this.router.navigate(['/login']);
  }

}
