import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpubBarComponent } from './cpub-bar.component';

describe('CpubBarComponent', () => {
  let component: CpubBarComponent;
  let fixture: ComponentFixture<CpubBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpubBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpubBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
