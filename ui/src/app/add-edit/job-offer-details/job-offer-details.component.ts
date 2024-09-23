import { Component,OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { JobOfferComponent } from 'src/app/add-edit/job-offer/job-offer.component';
import { JobOfferDatesComponent } from '../job-offer-dates/job-offer-dates.component';
import { NgFor } from '@angular/common';
import { DataServiceService } from 'src/app/services/data-service.service';


@Component({
  selector: 'app-job-offer-details',
  templateUrl: './job-offer-details.component.html',
  styleUrls: ['./job-offer-details.component.scss'],
  standalone:true,
  imports:[MatDialogModule,JobOfferComponent,NgFor],
})
export class JobOfferDetailsComponent implements OnInit{
  constructor(
    private _dataService: DataServiceService,
    private _dialogRef:DialogRef<JobOfferDetailsComponent>,
    private _dialogDetails: MatDialog, 
    private _dialogDates: MatDialog, 
    @Inject(MAT_DIALOG_DATA) private data: any) {}

  ngOnInit() {
    console.log(this.data);
  }
  
  getData():any{
    return this.data;
  }

  getPosition():any{
    return this.data.position;
  }

  getLocation():any{
    return this.data.location;
  }

  getCompanyName():any{
    return this.data.companyName;
  }

  getMode():any{
    return this.data.mode;
  }

  getContactInfo():any{
    return this.data.contactInfo;
  }

  getCustomNotes():any{
    return this.data.customNotes;
  }

  getDates():any{
    if (!this.data.dates) {
      return [];
    }
    return Object.keys(this.data.dates).map(date => ({
      date,
      events: this.data.dates[date]
    }));
  }

  getEmail():any{
    return this.data.email;
  }

  getJobDescription():any{
    return this.data.jobDescription;
  }

  getSalary():any{
    return this.data.salary;
  }

  getStatus():any{
    return this.data.status;
  }

  getURL():any{
    return this.data.url;
  }

  onClose(){
    this._dialogRef.close();
  }

  onEdit(){
    console.log("Editing")
  }

  editJobOffer(data: any){
    this._dialogDetails.open(JobOfferComponent, {
      data,
    });
  }

  addDates(data: any){
    this._dialogDates.open(JobOfferDatesComponent, {
      data,
    });
  }

  deleteJobOffer(_id: string){
    this._dataService.deleteJobOffer(_id).subscribe({
      next: (res) => {
        console.log('job offer deleted');
        window.location.reload();
      },
      error: console.log,
    })
  }
}
