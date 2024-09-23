import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBoardComponent } from './status-board/status-board.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    StatusBoardComponent,
  ],
  exports: [
    StatusBoardComponent,
    RouterModule,
  ],
})
export class StatusViewModule { }
