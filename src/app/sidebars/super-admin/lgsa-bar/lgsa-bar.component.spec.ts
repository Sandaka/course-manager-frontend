import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LgsaBarComponent } from './lgsa-bar.component';

describe('LgsaBarComponent', () => {
  let component: LgsaBarComponent;
  let fixture: ComponentFixture<LgsaBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LgsaBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LgsaBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
