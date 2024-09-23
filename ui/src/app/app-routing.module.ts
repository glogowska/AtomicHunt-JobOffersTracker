import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToolbarComponent } from './toolbar-sidebar/toolbar/toolbar.component';
import { SidebarComponent } from './toolbar-sidebar/sidebar/sidebar.component';
import { StatusBoardComponent } from './status-view/status-board/status-board.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TagJoboffersListComponent } from './tag-view/tag-joboffers-list/tag-joboffers-list.component';
import { JobOfferComponent } from './add-edit/job-offer/job-offer.component';
import { CalendarComponent } from './calendar-view/calendar/calendar.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path: 'status-view', component: StatusBoardComponent, canActivate: [authGuard] },
  { path: 'calendar-view', component: CalendarComponent, canActivate: [authGuard] },
  { path: 'tag-view', component: TagJoboffersListComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
