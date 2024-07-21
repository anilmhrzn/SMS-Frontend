import { TestBed } from '@angular/core/testing';

import { ViewMarksByExamIdService } from './view-marks-by-exam-id.service';

describe('ViewMarksByExamIdService', () => {
  let service: ViewMarksByExamIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewMarksByExamIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
