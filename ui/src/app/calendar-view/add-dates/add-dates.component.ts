import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { DataServiceService } from 'src/app/services/data-service.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-add-dates',
  templateUrl: './add-dates.component.html',
  styleUrls: ['./add-dates.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, FormsModule, ReactiveFormsModule, NgFor, MatDialogModule]
})
export class AddDatesComponent implements OnInit {
  datesForm: FormGroup;
  JobOffers: { [key: string]: string } = {};
  date: string = "";
  
  constructor(
    private _dataService: DataServiceService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddDatesComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any){
      this.datesForm = this.fb.group({
        jobOfferId: "",
        event:""
      });
    }
  
  ngOnInit(): void {
    this.date = this.convertDate();
    this.fillTheJobOfferDictionary();
  }

  fillTheJobOfferDictionary() {
    this._dataService.getJobOfferList().subscribe({
      next: (res) => {
        res.forEach(jobOffer => {
          const jobVal = `${jobOffer.position}, ${jobOffer.companyName}, ${jobOffer.location}`;
          this.JobOffers[jobOffer._id] = jobVal;
        });
        console.log("Job Offers:", this.JobOffers);
      },
      error: (err) => {
        console.error("Error fetching job offers:", err);
      }
    });
  }


  JobOfferKeys(): string[] {
    return Object.keys(this.JobOffers).map(String);
  }


  convertDate(): string{
    const dateObj = new Date(this.data);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  addDate() {
    const formValue = this.datesForm.value;
    const dateKey = this.date;
    const eventDescription = formValue.event;
    const jobOfferId = formValue.jobOfferId;

    // Fetching the job offer object using jobOfferId
    this._dataService.getJobOfferById(jobOfferId).subscribe({
      next: (jobOffer) => {
        // Ensuring dates is initialized as an object with arrays of strings
        if (!jobOffer.dates) {
          jobOffer.dates = {};
        }
        console.log("this");

        // Ensuring the specific date entry is an array
        if (!Array.isArray(jobOffer.dates[dateKey])) {
          jobOffer.dates[dateKey] = [];
        }

        // Pushing the new event description
        jobOffer.dates[dateKey].push(eventDescription);

        // Converting dates object to an array of key-value pairs and sort
        const sortedDatesArray = Object.entries(jobOffer.dates).sort((a, b) => {
          return new Date(a[0]).getTime() - new Date(b[0]).getTime();
        });

        // Converting sorted array back to an object
        jobOffer.dates = Object.fromEntries(sortedDatesArray);

        // Updating the job offer list
        this._dataService.updateJobOfferList(jobOffer, jobOfferId).subscribe({
          next: (res) => {
            this.dialogRef.close(res);

          },
          error: (err) => {
            console.log(err);
          }
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
