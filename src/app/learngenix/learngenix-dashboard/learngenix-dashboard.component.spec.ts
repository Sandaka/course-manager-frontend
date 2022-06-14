import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearngenixDashboardComponent } from './learngenix-dashboard.component';

describe('LearngenixDashboardComponent', () => {
  let component: LearngenixDashboardComponent;
  let fixture: ComponentFixture<LearngenixDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearngenixDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearngenixDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
