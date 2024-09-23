import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagJoboffersListComponent } from './tag-joboffers-list/tag-joboffers-list.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    TagJoboffersListComponent
  ],
  exports: [
    TagJoboffersListComponent
  ]
})
export class TagViewModule { }
