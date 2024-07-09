import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentOfUserComponent } from './student-of-user.component';

describe('StudentOfUserComponent', () => {
  let component: StudentOfUserComponent;
  let fixture: ComponentFixture<StudentOfUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentOfUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentOfUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
