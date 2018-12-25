import { TestBed, async, inject } from '@angular/core/testing';

import { MailingGuard } from './mailing.guard';

describe('MailingGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MailingGuard]
    });
  });

  it('should ...', inject([MailingGuard], (guard: MailingGuard) => {
    expect(guard).toBeTruthy();
  }));
});
