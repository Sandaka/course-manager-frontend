import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSelfRegistrationComponent } from './student-self-registration.component';

describe('StudentSelfRegistrationComponent', () => {
  let component: StudentSelfRegistrationComponent;
  let fixture: ComponentFixture<StudentSelfRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentSelfRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSelfRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
