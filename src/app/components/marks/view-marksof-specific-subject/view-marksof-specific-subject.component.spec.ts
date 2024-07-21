import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMarksofSpecificSubjectComponent } from './view-marksof-specific-subject.component';

describe('ViewMarksofSpecificSubjectComponent', () => {
  let component: ViewMarksofSpecificSubjectComponent;
  let fixture: ComponentFixture<ViewMarksofSpecificSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMarksofSpecificSubjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMarksofSpecificSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
