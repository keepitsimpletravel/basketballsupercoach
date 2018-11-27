/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FilteredplayersService } from './filteredplayers.service';

describe('Service: Filteredplayers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilteredplayersService]
    });
  });

  it('should ...', inject([FilteredplayersService], (service: FilteredplayersService) => {
    expect(service).toBeTruthy();
  }));
});
