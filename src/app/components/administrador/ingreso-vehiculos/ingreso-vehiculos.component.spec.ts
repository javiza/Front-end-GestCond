import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IngresoVehiculosComponent } from './ingreso-vehiculos.component';

describe('IngresoVehiculosComponent', () => {
  let component: IngresoVehiculosComponent;
  let fixture: ComponentFixture<IngresoVehiculosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IngresoVehiculosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IngresoVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
