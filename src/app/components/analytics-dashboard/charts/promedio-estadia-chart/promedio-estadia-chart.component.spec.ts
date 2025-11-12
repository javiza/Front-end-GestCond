import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PromedioEstadiaChartComponent } from './promedio-estadia-chart.component';

describe('PromedioEstadiaChartComponent', () => {
  let component: PromedioEstadiaChartComponent;
  let fixture: ComponentFixture<PromedioEstadiaChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PromedioEstadiaChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PromedioEstadiaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
