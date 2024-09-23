import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidenavToggleService } from 'src/app/sidenav-toggle.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone:true,
  imports: [MatToolbarModule, NgIf],
})
export class ToolbarComponent implements OnInit{

  isLoggedIn: boolean = this._authService.isLoggedIn();

  constructor(private sidenavToggleService: SidenavToggleService, private _router: Router, private _authService: AuthServiceService) { }

  ngOnInit(): void {
    this._authService.isLoggedIn$.subscribe(res => {
      this.isLoggedIn = res;
    });
  }

  toggleSidenav() {
    this.sidenavToggleService.toggle();
  }

  changeViewToStatus(){
    this._router.navigate(['status-view']);
  }

  changeViewToTag(){
    this._router.navigate(['tag-view']);
  }

  changeViewToCalendar(){
    this._router.navigate(['calendar-view']);
  }

  logOut() {
    this.sidenavToggleService.closeSideDrawer();
    this._authService.logoutUser().subscribe(
      response => {
        console.log(response.message);
        this._authService.isLoggedIn$.next(false);
        this._authService.logoutStorage();
        this._router.navigate(['/login']);
      },
      error => {
        console.error('Logout error', error);
      }
    );
  }

  logInRedirect(){
    this._router.navigate(['login']);
  }

  registerRedirect(){
    this._router.navigate(['register']);
  }

}
