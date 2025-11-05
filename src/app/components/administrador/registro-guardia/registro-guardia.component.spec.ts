import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegistroGuardiaComponent } from './registro-guardia.component';

describe('RegistroGuardiaComponent', () => {
  let component: RegistroGuardiaComponent;
  let fixture: ComponentFixture<RegistroGuardiaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RegistroGuardiaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroGuardiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
