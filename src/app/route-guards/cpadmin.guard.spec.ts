import { TestBed } from '@angular/core/testing';

import { CPAdminGuard } from './cpadmin.guard';

describe('CPAdminGuard', () => {
  let guard: CPAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CPAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
