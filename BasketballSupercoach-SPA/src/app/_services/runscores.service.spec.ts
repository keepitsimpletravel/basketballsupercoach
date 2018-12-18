/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RunscoresService } from './runscores.service';

describe('Service: Runscores', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RunscoresService]
    });
  });

  it('should ...', inject([RunscoresService], (service: RunscoresService) => {
    expect(service).toBeTruthy();
  }));
});
