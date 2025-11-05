import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LectorQrComponent } from './lector-qr.component';

describe('LectorQrComponent', () => {
  let component: LectorQrComponent;
  let fixture: ComponentFixture<LectorQrComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LectorQrComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LectorQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
