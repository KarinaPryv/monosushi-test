/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ImagesStorageService } from './images-storage.service';

describe('Service: ImagesStorage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImagesStorageService]
    });
  });

  it('should ...', inject([ImagesStorageService], (service: ImagesStorageService) => {
    expect(service).toBeTruthy();
  }));
});
