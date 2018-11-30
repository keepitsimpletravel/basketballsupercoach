/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TeamdetailService } from './teamdetail.service';

describe('Service: Teamdetail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamdetailService]
    });
  });

  it('should ...', inject([TeamdetailService], (service: TeamdetailService) => {
    expect(service).toBeTruthy();
  }));
});
