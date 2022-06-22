import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StubBarComponent } from './stub-bar.component';

describe('StubBarComponent', () => {
  let component: StubBarComponent;
  let fixture: ComponentFixture<StubBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StubBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StubBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
