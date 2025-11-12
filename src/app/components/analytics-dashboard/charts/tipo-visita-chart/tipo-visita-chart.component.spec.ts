import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TipoVisitaChartComponent } from './tipo-visita-chart.component';

describe('TipoVisitaChartComponent', () => {
  let component: TipoVisitaChartComponent;
  let fixture: ComponentFixture<TipoVisitaChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TipoVisitaChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TipoVisitaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
