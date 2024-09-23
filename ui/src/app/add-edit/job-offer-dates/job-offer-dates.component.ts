import { Component, Inject } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef,MatDialogModule } from '@angular/material/dialog';
import { DataServiceService } from 'src/app/services/data-service.service';
import { NgFor, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-job-offer-dates',
  templateUrl: './job-offer-dates.component.html',
  styleUrls: ['./job-offer-dates.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, NgFor, NgIf,MatFormFieldModule,MatInputModule,MatButtonModule,MatSelectModule,FormsModule]
})
export class JobOfferDatesComponent {
  datesForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _dataService: DataServiceService,
    public dialogRef: MatDialogRef<JobOfferDatesComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.datesForm = this.fb.group({
      date:"",
      event:""
    });
  }

  getId(): string{
    return this.data._id;
  }

  getDates(): any{
    if (!this.data.dates) {
      return [];
    }
    return Object.keys(this.data.dates).map(date => ({
      date,
      events: this.data.dates[date]
    }));
  }

  deleteDateEvent(dateIndex: number, eventIndex: number) {
    const datesArray = this.getDates();
    const dateKey = datesArray[dateIndex].date;

    if (this.data.dates[dateKey] && this.data.dates[dateKey].length > eventIndex) {
      console.log('Before deletion:', this.data.dates[dateKey]);

      this.data.dates[dateKey].splice(eventIndex, 1);

      console.log('After deletion:', this.data.dates[dateKey]);

      if (this.data.dates[dateKey].length === 0) {
        delete this.data.dates[dateKey];
      }

      this._dataService.updateJobOfferList(this.data, this.getId()).subscribe({
        next: (res) => {
          console.log('Job offer updated:', res);
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else {
      console.log('Invalid eventIndex or dateKey:', eventIndex, dateKey);
    }
  }


  addDate() {
    const formValue = this.datesForm.value;
    const dateKey = formValue.date;
    const eventDescription = formValue.event;

    console.log('Form Value:', formValue);
    console.log('Current Dates:', this.data.dates); 

    if (!dateKey || !eventDescription) {
      console.error('Date or event description is empty.');
      return;
    }

    if (!this.data.dates[dateKey]) {
      this.data.dates[dateKey] = [];
    }
    this.data.dates[dateKey].push(eventDescription);

    // Converting dates object to an array of key-value pairs
    const sortedDatesArray = Object.entries(this.data.dates).sort((a, b) => {
      return new Date(a[0]).getTime() - new Date(b[0]).getTime();
    });

    // Converting sorted array back to an object
    this.data.dates = Object.fromEntries(sortedDatesArray);

    this._dataService.updateJobOfferList(this.data, this.getId()).subscribe({
      next: (res) => {
        console.log('Job offer updated:', res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  onClose(){
    this.dialogRef.close();
  }
  

}
  
  