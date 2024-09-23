import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ToolbarSidebarModule } from './toolbar-sidebar/toolbar-sidebar.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StatusViewModule } from './status-view/status-view.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TagViewModule } from './tag-view/tag-view.module';
import { HttpClientModule } from '@angular/common/http';
import { AddEditModule } from './add-edit/add-edit.module';
import { CalendarViewModule } from './calendar-view/calendar-view.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ToolbarSidebarModule,
    BrowserAnimationsModule,
    StatusViewModule,
    TagViewModule,
    HttpClientModule,
    AddEditModule,
    CalendarViewModule,
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
