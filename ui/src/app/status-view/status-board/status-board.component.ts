import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { MatDialog} from '@angular/material/dialog';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { JobOfferComponent } from 'src/app/add-edit/job-offer/job-offer.component';
import { JobOfferDetailsComponent } from 'src/app/add-edit/job-offer-details/job-offer-details.component';
import { NgFor,NgIf,NgClass} from '@angular/common';


@Component({
  selector: 'app-status-board',
  templateUrl: './status-board.component.html',
  styleUrls: ['./status-board.component.scss'],
  standalone: true,
  imports: [DragDropModule,CdkDrag,CdkDropList,NgFor,NgIf,NgClass, JobOfferComponent, JobOfferDetailsComponent],
})
export class StatusBoardComponent implements OnInit{

  statuses = ['Interested', 'Applied', 'Interviewed', 'Offered'];
  items: { [key: string]: any[] } = {};

  constructor(private _jobOfferService: DataServiceService, private _dialog: MatDialog) {}

  ngOnInit() {
    this.getJobOfferList();
  }

  getJobOfferList() {
    this._jobOfferService.getJobOfferList().subscribe({
      next: (res) => {
        this.statuses.forEach(status => {
          this.items[status] = res.filter(item => item.status === status);
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  drop(event: CdkDragDrop<any[]>, status: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const movedItem = event.previousContainer.data[event.previousIndex];
      movedItem.status = status;
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this._jobOfferService.updateJobOfferList(movedItem, movedItem._id).subscribe({
        next: (res) => console.log('Job offer updated successfully', res),
        error: (err) => console.log('Error updating job offer', err)
      });
      console.log(movedItem);
    }
  }

  consoleLog(item: any){
    console.log(item);
  }

  openJobOfferDetails(data: any){
    this._dialog.open(JobOfferDetailsComponent, {
      data,
    });
  }

  openAddEditJobOfferForm(){
    this._dialog.open(JobOfferComponent);
  }

  isOffered(status: string){
    return (status==="Offered");
  }
}