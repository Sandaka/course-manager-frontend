import { TestBed } from '@angular/core/testing';

import { StudentForumService } from './student-forum.service';

describe('StudentForumService', () => {
  let service: StudentForumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentForumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
