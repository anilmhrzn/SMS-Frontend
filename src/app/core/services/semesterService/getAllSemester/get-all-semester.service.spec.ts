import { TestBed } from '@angular/core/testing';

import { GetAllSemesterService } from './get-all-semester.service';

describe('GetAllSemesterService', () => {
  let service: GetAllSemesterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllSemesterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
