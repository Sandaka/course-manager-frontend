import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRegistrationPaymentComponent } from './student-registration-payment.component';

describe('StudentRegistrationPaymentComponent', () => {
  let component: StudentRegistrationPaymentComponent;
  let fixture: ComponentFixture<StudentRegistrationPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentRegistrationPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentRegistrationPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
