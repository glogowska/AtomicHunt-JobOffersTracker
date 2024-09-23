import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { DataServiceService } from 'src/app/services/data-service.service';
import { DialogRef } from '@angular/cdk/dialog';


@Component({
  selector: 'app-job-offer',
  templateUrl: './job-offer.component.html',
  styleUrls: ['./job-offer.component.scss'],
  standalone: true,
  imports:[ReactiveFormsModule,FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule,NgFor]
})

export class JobOfferComponent implements OnInit{
  constructor(
    private _fb: FormBuilder, 
    private _dataService: DataServiceService, 
    private _dialogRef:DialogRef<JobOfferComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
    this.jobForm = this._fb.group({
      status:'',
      position:'',
      location:'',
      companyName:'',
      mode:'',
      jobDescription:'',
      email:'',
      contactInfo:'',
      salary:'',
      dates:[],
      url:'',
      customNotes:'',
      
    })
  }

  ngOnInit() {
    console.log("opened",this.data);
    this.jobForm.patchValue(this.data);
  }

  statuses: string[] = [
    'Interested',
    'Applied',
    'Interviewed',
    'Offered'
  ];

 modes: string[] = [
    'Remote',
    'On-Site',
    'Hybrid',
    'Unknown'
  ];

  selectedStatus!: string;

  jobForm: FormGroup;

  onFormSubmit(){
    if(this.jobForm.valid && this.data==null){
       
      this._dataService.createJobOffer(this.jobForm.value).subscribe({
        next: (val: any) => {
          console.log('job offer created');
          this._dialogRef.close();
          window.location.reload();
        },
        error: (err:any) => {
          console.error(err);
        }
      })
    }

    else if(this.jobForm.valid && this.data!==null){
       console.log("trying to edit",this.data._id );
      this._dataService.updateJobOfferList(this.jobForm.value,this.data._id).subscribe({
        next: (val: any) => {
          console.log('job offer edited');
          this._dialogRef.close();
          window.location.reload();
      
        },
        error: (err:any) => {
          console.error(err);
        }
      })
    }
  }

  onCancel(){
    this.jobForm.reset();
    this._dialogRef.close();
  }
}
