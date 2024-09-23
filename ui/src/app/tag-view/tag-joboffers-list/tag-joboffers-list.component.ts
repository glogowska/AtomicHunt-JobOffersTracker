import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { ViewChild} from '@angular/core';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSort, MatSortModule} from '@angular/material/sort';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { JobOfferComponent } from 'src/app/add-edit/job-offer/job-offer.component';
import { JobOfferDetailsComponent } from 'src/app/add-edit/job-offer-details/job-offer-details.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import {CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-tag-joboffers-list',
  templateUrl: './tag-joboffers-list.component.html',
  styleUrls: ['./tag-joboffers-list.component.scss'],
  standalone:true,
  imports:[CdkDrag, CdkDropList, NgIf,ReactiveFormsModule,FormsModule,MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatDialogModule, JobOfferComponent, JobOfferDetailsComponent]
})
export class TagJoboffersListComponent implements OnInit {
  

  displayedColumns: string[] = ['status','position','location','companyName','mode','email','contactInfo','salary','action'];
  dataSource!: MatTableDataSource<any>;
  filterVisible: boolean = false;
  statusColumn: boolean = true;
  positionColumn: boolean = true;
  locationColumn: boolean = true;
  companyNameColumn: boolean = true;
  modeColumn: boolean = true;
  emailColumn: boolean = true;
  contactInfoColumn: boolean = true;
  salaryColumn: boolean = true;
  //urlColumn: boolean = true;

  columnVisibilityMap: { [key: string]: boolean } = {
    status: this.statusColumn,
    position: this.positionColumn,
    location: this.locationColumn,
    companyName: this.companyNameColumn,
    mode: this.modeColumn,
    email: this.emailColumn,
    contactInfo: this.contactInfoColumn,
    salary: this.salaryColumn,
   //url: this.urlColumn,
    action: true // Assuming action column is always visible
  };

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _jobOfferService: DataServiceService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void{
    this.getJobOfferList();
    this.removeColumns();
  }

  removeColumns() {
    //console.log(this.columnVisibilityMap);
    this.displayedColumns = this.displayedColumns.filter(column => this.columnVisibilityMap[column]);
    this.cdr.detectChanges();

  }

  updateDisplayedColumns() {
    this.displayedColumns = [
      this.statusColumn ? 'status' : null,
      this.positionColumn ? 'position' : null,
      this.locationColumn ? 'location' : null,
      this.companyNameColumn ? 'companyName' : null,
      this.modeColumn ? 'mode' : null,
      this.emailColumn ? 'email' : null,
      this.contactInfoColumn ? 'contactInfo' : null,
      this.salaryColumn ? 'salary' : null,
      //this.urlColumn ? 'url' : null,
      'action',
    ].filter(Boolean) as string[];
    this.cdr.detectChanges();
  }

  getJobOfferList(){
    this._jobOfferService.getJobOfferList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        //this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddEditJobOfferForm(){
    this._dialog.open(JobOfferComponent);
  }

  openJobOfferDetails(data: any){
    this._dialog.open(JobOfferDetailsComponent, {
      data,
    });
  }

  deleteJobOffer(_id: string){
    this._jobOfferService.deleteJobOffer(_id).subscribe({
      next: (res) => {
        console.log('job offer deleted')
        this.getJobOfferList();
      },
      error: console.log,
    })
  }

  editJobOffer(data: any){
    this._dialog.open(JobOfferComponent, {
      data,
    });
  }

  onFilter(){
    this.filterVisible = true;
    
  }

  onCloseFilter(){
    this.filterVisible = false;
    this.updateDisplayedColumns();
    console.log("displayed columns:",this.displayedColumns);
    console.log("status:",this.statusColumn);
    console.log("position:",this.positionColumn);
    console.log("location:",this.locationColumn);
    console.log("email:",this.emailColumn);
    console.log("salary:",this.salaryColumn);
    console.log("mode:",this.modeColumn);
  }

  toggleStatus(){
    this.statusColumn = !this.statusColumn;
    this.updateDisplayedColumns();
  }

}
