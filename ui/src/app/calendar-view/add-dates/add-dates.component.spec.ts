import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDatesComponent } from './add-dates.component';

describe('AddDatesComponent', () => {
  let component: AddDatesComponent;
  let fixture: ComponentFixture<AddDatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDatesComponent]
    });
    fixture = TestBed.createComponent(AddDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
