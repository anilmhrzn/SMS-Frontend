import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfirstcomponentComponent } from './myfirstcomponent.component';

describe('MyfirstcomponentComponent', () => {
  let component: MyfirstcomponentComponent;
  let fixture: ComponentFixture<MyfirstcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyfirstcomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyfirstcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
