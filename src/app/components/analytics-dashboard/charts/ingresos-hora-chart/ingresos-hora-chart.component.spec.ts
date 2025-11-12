import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IngresosHoraChartComponent } from './ingresos-hora-chart.component';

describe('IngresosHoraChartComponent', () => {
  let component: IngresosHoraChartComponent;
  let fixture: ComponentFixture<IngresosHoraChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IngresosHoraChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IngresosHoraChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
