/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CategoryFilterDataService } from './category-filter-data.service';

describe('Service: CategoryFilterData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryFilterDataService]
    });
  });

  it('should ...', inject([CategoryFilterDataService], (service: CategoryFilterDataService) => {
    expect(service).toBeTruthy();
  }));
});
