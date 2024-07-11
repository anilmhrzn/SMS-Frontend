import { TestBed } from '@angular/core/testing';

import { SearchExamServiceService } from './search-exam-service.service';

describe('SearchExamServiceService', () => {
  let service: SearchExamServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchExamServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
