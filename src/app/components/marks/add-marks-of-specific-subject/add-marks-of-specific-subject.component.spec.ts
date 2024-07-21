import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMarksOfSpecificSubjectComponent } from './add-marks-of-specific-subject.component';

describe('AddMarksOfSpecificSubjectComponent', () => {
  let component: AddMarksOfSpecificSubjectComponent;
  let fixture: ComponentFixture<AddMarksOfSpecificSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMarksOfSpecificSubjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMarksOfSpecificSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
