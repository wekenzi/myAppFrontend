import { TestBed } from '@angular/core/testing';

import { EmailConfirmService } from './email-confirm.service';

describe('EmailConfirmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmailConfirmService = TestBed.get(EmailConfirmService);
    expect(service).toBeTruthy();
  });
});
