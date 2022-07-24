import { TestBed } from '@angular/core/testing';

import { BronzePkgGuard } from './bronze-pkg.guard';

describe('BronzePkgGuard', () => {
  let guard: BronzePkgGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BronzePkgGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
