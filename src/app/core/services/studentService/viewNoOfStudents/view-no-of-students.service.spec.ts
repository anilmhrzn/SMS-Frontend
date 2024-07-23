import { TestBed } from '@angular/core/testing';

import { ViewNoOfStudentsService } from './view-no-of-students.service';

describe('ViewNoOfStudentsService', () => {
  let service: ViewNoOfStudentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewNoOfStudentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
