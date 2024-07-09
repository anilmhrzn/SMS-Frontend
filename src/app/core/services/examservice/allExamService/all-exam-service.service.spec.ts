import { TestBed } from '@angular/core/testing';

import { AllExamServiceService } from './all-exam-service.service';

describe('AllExamServiceService', () => {
  let service: AllExamServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllExamServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
