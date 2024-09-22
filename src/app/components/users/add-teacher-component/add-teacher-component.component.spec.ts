import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeacherComponentComponent } from './add-teacher-component.component';

describe('AddTeacherComponentComponent', () => {
  let component: AddTeacherComponentComponent;
  let fixture: ComponentFixture<AddTeacherComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTeacherComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTeacherComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
