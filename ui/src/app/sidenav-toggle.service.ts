import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavToggleService {

  // state of the sideNav component (if it's true, then the drawer is visible, otherwise closed)
  private _isDrawerOpen: boolean = false;
  // default view of the web app
  private _viewName: string = "calendar-view";

  constructor() { }

  getIsOpen(): boolean {
    return this._isDrawerOpen;
  }

  getViewName(): string{
    return this._viewName;
  }

  toggle() {
    this._isDrawerOpen = !this._isDrawerOpen;
    console.log(this._isDrawerOpen);
  }

  closeSideDrawer(){
    this._isDrawerOpen = false;
  }

  changeViewToStatus(){
    this._viewName = "status-view";
  }

  changeViewToTag(){
    this._viewName = "tag-view";
  }

  changeViewToCalendar(){
    this._viewName = "calendar-view";
  }

  changeViewTo(newViewName:string){
    this._viewName = newViewName;
  }

}
