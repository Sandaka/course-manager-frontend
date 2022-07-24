import { TestBed } from '@angular/core/testing';

import { CPCoordinatorGuard } from './cpcoordinator.guard';

describe('CPCoordinatorGuard', () => {
  let guard: CPCoordinatorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CPCoordinatorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
