import { TestBed } from '@angular/core/testing';

import { AddExamServiceService } from './add-exam-service.service';

describe('AddExamServiceService', () => {
  let service: AddExamServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddExamServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
