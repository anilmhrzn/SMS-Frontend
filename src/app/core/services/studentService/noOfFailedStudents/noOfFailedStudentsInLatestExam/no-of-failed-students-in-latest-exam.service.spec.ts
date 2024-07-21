import { TestBed } from '@angular/core/testing';

import { NoOfFailedStudentsInLatestExamService } from './no-of-failed-students-in-latest-exam.service';

describe('NoOfFailedStudentsInLatestExamService', () => {
  let service: NoOfFailedStudentsInLatestExamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoOfFailedStudentsInLatestExamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
