/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DiscountsService } from './discounts.service';

describe('Service: Discounts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiscountsService]
    });
  });

  it('should ...', inject([DiscountsService], (service: DiscountsService) => {
    expect(service).toBeTruthy();
  }));
});
