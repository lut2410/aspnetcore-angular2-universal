/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JobSearchBoxDataService } from './job-search-box-data.service';

describe('Service: JobSearchBoxData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobSearchBoxDataService]
    });
  });

  it('should ...', inject([JobSearchBoxDataService], (service: JobSearchBoxDataService) => {
    expect(service).toBeTruthy();
  }));
});
