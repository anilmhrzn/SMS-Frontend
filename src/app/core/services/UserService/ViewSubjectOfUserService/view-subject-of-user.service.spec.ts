import { TestBed } from '@angular/core/testing';

import { ViewSubjectOfUserService } from './view-subject-of-user.service';

describe('ViewSubjectOfUserService', () => {
  let service: ViewSubjectOfUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewSubjectOfUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
