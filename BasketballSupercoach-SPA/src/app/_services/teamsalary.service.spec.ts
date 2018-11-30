/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TeamsalaryService } from './teamsalary.service';

describe('Service: Teamsalary', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamsalaryService]
    });
  });

  it('should ...', inject([TeamsalaryService], (service: TeamsalaryService) => {
    expect(service).toBeTruthy();
  }));
});
