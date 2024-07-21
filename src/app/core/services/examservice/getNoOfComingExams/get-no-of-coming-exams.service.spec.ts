import { TestBed } from '@angular/core/testing';

import { GetNoOfComingExamsService } from './get-no-of-coming-exams.service';

describe('GetNoOfComingExamsService', () => {
  let service: GetNoOfComingExamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetNoOfComingExamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
