import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOfferDatesComponent } from './job-offer-dates.component';

describe('JobOfferDatesComponent', () => {
  let component: JobOfferDatesComponent;
  let fixture: ComponentFixture<JobOfferDatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobOfferDatesComponent]
    });
    fixture = TestBed.createComponent(JobOfferDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
