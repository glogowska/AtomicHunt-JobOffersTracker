import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagJoboffersListComponent } from './tag-joboffers-list.component';

describe('TagJoboffersListComponent', () => {
  let component: TagJoboffersListComponent;
  let fixture: ComponentFixture<TagJoboffersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TagJoboffersListComponent]
    });
    fixture = TestBed.createComponent(TagJoboffersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
