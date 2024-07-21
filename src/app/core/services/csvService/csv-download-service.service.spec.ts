import { TestBed } from '@angular/core/testing';

import { CsvDownloadServiceService } from './csv-download-service.service';

describe('CsvDownloadServiceService', () => {
  let service: CsvDownloadServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsvDownloadServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
