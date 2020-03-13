import { TestBed } from '@angular/core/testing';

import { GenerallistsService } from './generallists.service';

describe('GenerallistsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenerallistsService = TestBed.get(GenerallistsService);
    expect(service).toBeTruthy();
  });
});
