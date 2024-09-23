import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { AddDatesComponent } from './add-dates/add-dates.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CalendarComponent,
    AddDatesComponent,
  ],
  exports:[
    CalendarComponent,
    AddDatesComponent,
  ]
})
export class CalendarViewModule { }
