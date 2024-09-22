import { TestBed } from '@angular/core/testing';

import { ViewSemesterOfUserService } from './view-semester-of-user.service';

describe('ViewSemesterOfUserService', () => {
  let service: ViewSemesterOfUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewSemesterOfUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
