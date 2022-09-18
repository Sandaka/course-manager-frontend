import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentApplicationComponent } from './view-student-application.component';

describe('ViewStudentApplicationComponent', () => {
  let component: ViewStudentApplicationComponent;
  let fixture: ComponentFixture<ViewStudentApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStudentApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStudentApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
