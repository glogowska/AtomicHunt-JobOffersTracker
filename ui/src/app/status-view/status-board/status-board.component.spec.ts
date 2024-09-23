import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusBoardComponent } from './status-board.component';

describe('StatusBoardComponent', () => {
  let component: StatusBoardComponent;
  let fixture: ComponentFixture<StatusBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusBoardComponent]
    });
    fixture = TestBed.createComponent(StatusBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
