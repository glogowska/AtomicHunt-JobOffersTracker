import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidenavToggleService } from '../sidenav-toggle.service';



@NgModule({
  declarations: [

  ],
  providers: [
    SidenavToggleService,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ToolbarComponent,
    SidebarComponent,
  ],
  exports: [
    ToolbarComponent,
    RouterModule,
    SidebarComponent,
  ]
})
export class ToolbarSidebarModule { }
