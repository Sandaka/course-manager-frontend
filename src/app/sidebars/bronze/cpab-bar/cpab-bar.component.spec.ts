import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpabBarComponent } from './cpab-bar.component';

describe('CpabBarComponent', () => {
  let component: CpabBarComponent;
  let fixture: ComponentFixture<CpabBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpabBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpabBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
