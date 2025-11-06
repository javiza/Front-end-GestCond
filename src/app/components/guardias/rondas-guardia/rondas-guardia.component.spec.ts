import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RondasGuardiaComponent } from './rondas-guardia.component';

describe('RondasGuardiaComponent', () => {
  let component: RondasGuardiaComponent;
  let fixture: ComponentFixture<RondasGuardiaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RondasGuardiaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RondasGuardiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
