import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemaningComponent } from './remaning.component';

describe('RemaningComponent', () => {
  let component: RemaningComponent;
  let fixture: ComponentFixture<RemaningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemaningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
