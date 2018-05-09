/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SearchConditionService } from './search-condition.service';

describe('Service: SearchCondition', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchConditionService]
    });
  });

  it('should ...', inject([SearchConditionService], (service: SearchConditionService) => {
    expect(service).toBeTruthy();
  }));
});
