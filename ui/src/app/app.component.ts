import { Component } from '@angular/core';
import { SidenavToggleService } from './sidenav-toggle.service';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent {
  title = 'AleksandraGlogowskaBscApp';

  constructor(private sidenavService: SidenavToggleService) {}

  getIsDrawerOpened(): boolean {
    return this.sidenavService.getIsOpen();
  }

}
