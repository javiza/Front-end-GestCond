import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IngresosDiariosChartComponent } from './ingresos-diarios-chart.component';

describe('IngresosDiariosChartComponent', () => {
  let component: IngresosDiariosChartComponent;
  let fixture: ComponentFixture<IngresosDiariosChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IngresosDiariosChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IngresosDiariosChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
