/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ScoringsystemService } from './scoringsystem.service';

describe('Service: Scoringsystem', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScoringsystemService]
    });
  });

  it('should ...', inject([ScoringsystemService], (service: ScoringsystemService) => {
    expect(service).toBeTruthy();
  }));
});
