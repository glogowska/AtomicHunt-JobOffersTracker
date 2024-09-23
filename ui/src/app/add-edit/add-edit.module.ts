import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobOfferComponent } from './job-offer/job-offer.component';
import { Router, RouterModule } from '@angular/router';
import { JobOfferDetailsComponent } from './job-offer-details/job-offer-details.component';
import { JobOfferDatesComponent } from './job-offer-dates/job-offer-dates.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    JobOfferComponent,
    JobOfferDetailsComponent,
    JobOfferDatesComponent
  ],
  exports: [
    RouterModule,
    JobOfferComponent,
    JobOfferDetailsComponent
  ]
})
export class AddEditModule { }
