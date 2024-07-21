import { TestBed } from '@angular/core/testing';

import { GetComingExamsService } from './get-coming-exams.service';

describe('GetComingExamsService', () => {
  let service: GetComingExamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetComingExamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
