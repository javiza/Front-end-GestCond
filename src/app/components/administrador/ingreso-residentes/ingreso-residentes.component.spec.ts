import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IngresoResidentesComponent } from './ingreso-residentes.component';

describe('IngresoResidentesComponent', () => {
  let component: IngresoResidentesComponent;
  let fixture: ComponentFixture<IngresoResidentesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IngresoResidentesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IngresoResidentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
