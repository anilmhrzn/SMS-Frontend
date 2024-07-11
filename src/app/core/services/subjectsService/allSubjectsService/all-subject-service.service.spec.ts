import { TestBed } from '@angular/core/testing';

import { AllSubjectServiceService } from './all-subject-service.service';

describe('AllSubjectServiceService', () => {
  let service: AllSubjectServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllSubjectServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
