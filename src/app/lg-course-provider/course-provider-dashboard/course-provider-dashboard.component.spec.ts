import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseProviderDashboardComponent } from './course-provider-dashboard.component';

describe('CourseProviderDashboardComponent', () => {
  let component: CourseProviderDashboardComponent;
  let fixture: ComponentFixture<CourseProviderDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseProviderDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseProviderDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
