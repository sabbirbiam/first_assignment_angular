import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {
  constructor(
    public storage: WebStorageService
  ) {
  }
  ngOnInit(): void {

  }

}
