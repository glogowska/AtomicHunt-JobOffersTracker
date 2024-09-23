import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavToggleService } from 'src/app/sidenav-toggle.service';
import { NgFor, KeyValuePipe, CommonModule } from '@angular/common';
import { DataServiceService } from 'src/app/services/data-service.service';
import { JobOffer } from 'src/app/models/job-offer';
import { DateTime } from 'luxon';
import { Router } from '@angular/router';

export interface UpcomingJobOffer {
  jobOffer: JobOffer;
  date: string;
  events: string[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [CommonModule, MatSidenavModule, NgFor, KeyValuePipe]
})
export class SidebarComponent implements OnInit {
  upcomingJobOffers: UpcomingJobOffer[] = [];

  constructor(private _sidenavToggleService: SidenavToggleService, private _dataService: DataServiceService, private _router: Router) {}

  ngOnInit() {
    this._dataService.jobOffers$.subscribe({
      next: (jobOffers) => {
        this.upcomingJobOffers = jobOffers.flatMap(jobOffer => {
          return Object.entries(jobOffer.dates)
            .filter(([date]) => {
              const dateObj = DateTime.fromISO(date);
              return dateObj >= DateTime.local() && dateObj <= DateTime.local().plus({ days: 7 });
            })
            .map(([date, events]) => ({ jobOffer, date, events }));
        });
      },
      error: (err) => console.error(err)
    });
    this._dataService.fetchJobOffers();
  }

  getIsOpened(): boolean {
    return this._sidenavToggleService.getIsOpen();
  }

  toCalendarView(){
    this._router.navigate(['calendar-view']);
  }
}