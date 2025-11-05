import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AutorizacionQrComponent } from './autorizacion-qr.component';

describe('AutorizacionQrComponent', () => {
  let component: AutorizacionQrComponent;
  let fixture: ComponentFixture<AutorizacionQrComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AutorizacionQrComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AutorizacionQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
