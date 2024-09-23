import { Component, ViewEncapsulation, computed, signal, Signal, WritableSignal, Input, OnInit } from '@angular/core';
import { DateTime, Info, Interval } from 'luxon';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { Dates, Meetings } from './dates.interface';
import { DataServiceService } from 'src/app/services/data-service.service';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { JobOfferDetailsComponent } from 'src/app/add-edit/job-offer-details/job-offer-details.component';
import { MatDialog} from '@angular/material/dialog';
import { AddDatesComponent } from '../add-dates/add-dates.component';

const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  imports: [NgFor, NgClass, NgIf, MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    JobOfferDetailsComponent,
   AddDatesComponent,]
})
export class CalendarComponent implements OnInit {
  constructor(
    private _dataService: DataServiceService, 
    private _dialogDetails: MatDialog,
    private _dialogDatesCalenadar: MatDialog ){}

  date = new FormControl(moment());
  @Input() dates: Dates = {};
  activeDay: WritableSignal<DateTime | null> = signal(null);
  today: Signal<DateTime> = signal(DateTime.local());
  firstDayOfActiveMonth: WritableSignal<DateTime> = signal(
    this.today().startOf('month'),
  );
  weekDays: Signal<string[]> = signal(Info.weekdays('short'));
  daysOfMonth: Signal<DateTime[]> = computed(() => {
    return Interval.fromDateTimes(
      this.firstDayOfActiveMonth().startOf('week'),
      this.firstDayOfActiveMonth().endOf('month').endOf('week'),
    ).splitBy({day:1})
    .map((d) => {
      if (d.start === null){
        throw new Error('Wrong dates');
      }
      return d.start;
    });
  });

  DATE_MED = DateTime.DATE_MED;
  activeDayDates: Signal<Meetings[]> = computed(() => {
    const activeDay = this.activeDay();
    if (activeDay === null) {
      return [];
    }
    const activeDayISO = activeDay.toISODate();
    if (!activeDayISO) {
      return [];
    }
    return this.dates[activeDayISO] ?? [];
  });

  ngOnInit() {
    // this.getJobOfferList();
    this._dataService.jobOffers$.subscribe({
      next: (res) => {
        this.dates = {};
        res.forEach((jobOffer) => {
          if (jobOffer.dates) {
            for (const [date, events] of Object.entries(jobOffer.dates)) {
              if (!this.dates[date]) {
                this.dates[date] = [];
              }
              (events as unknown as string[]).forEach((event: string) => {
                this.dates[date].push({ description: event, jobOfferId: jobOffer._id });
              });
            }
          }
        });
        console.log("Loaded dates: ", this.dates);
      },
      error: (err) => {
        console.log(err);
      }
    });
    this._dataService.fetchJobOffers(); 
    
  }

  getJobOfferList() {
    this._dataService.getJobOfferList().subscribe({
      next: (res) => {
        res.forEach((jobOffer) => {
          if (jobOffer.dates) {
            for (const [date, events] of Object.entries(jobOffer.dates)) {
              if (!this.dates[date]) {
                this.dates[date] = [];
              }
              (events as unknown as string[]).forEach((event: string) => {
                this.dates[date].push({ description: event, jobOfferId: jobOffer._id });
              });
            }
          }
        });
        console.log("Loaded dates: ", this.dates);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
  

  goToPreviousMonth(): void{
    this.firstDayOfActiveMonth.set(
      this.firstDayOfActiveMonth().minus({month: 1}),
    );
  }

  goToNextMonth(): void{
    this.firstDayOfActiveMonth.set(
      this.firstDayOfActiveMonth().plus({month: 1}),
    );
  }

  goToToday(): void{
    this.firstDayOfActiveMonth.set(this.today().startOf('month'));
  }

  setDate(date: string): void{
    const dateTime = DateTime.fromISO(date);
    this.firstDayOfActiveMonth.set(dateTime.startOf('month'));
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
    console.log("current date:",ctrlValue.format('YYYY-MM-DD'))
    this.setDate(ctrlValue.format('YYYY-MM-DD'));
    
  }

  returnJobOfferObject(_id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._dataService.getJobOfferById(_id).subscribe({
        next: (res) => {
          console.log("res", res);
          resolve(res);
        },
        error: (err) => {
          console.log(err);
          reject(err);
        }
      });
    });
  }
  
  async openJobOfferDetails(_id: string) {
    try {
      const data = await this.returnJobOfferObject(_id);
      this._dialogDetails.open(JobOfferDetailsComponent, {
        data,
      });
      console.log("data", data);
    } catch (error) {
      console.error("Failed to fetch job offer details", error);
    }
  }

  openDatesCalendar(data: any){
    this._dialogDatesCalenadar.open(AddDatesComponent, {
      data,
    });
  }

  hasMeetings(date: DateTime): boolean {
    const isoDate = date.toISODate();
    return isoDate ? this.dates[isoDate] && this.dates[isoDate].length > 0 : false;
  }
}
