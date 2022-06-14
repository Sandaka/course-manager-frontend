import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LgHomeComponent } from './lg-home.component';

describe('LgHomeComponent', () => {
  let component: LgHomeComponent;
  let fixture: ComponentFixture<LgHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LgHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LgHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
