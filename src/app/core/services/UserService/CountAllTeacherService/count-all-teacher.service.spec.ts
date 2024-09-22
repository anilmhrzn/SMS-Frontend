import { TestBed } from '@angular/core/testing';

import { CountAllTeacherService } from './count-all-teacher.service';

describe('CountAllTeacherService', () => {
  let service: CountAllTeacherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountAllTeacherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
