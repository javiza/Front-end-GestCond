import {
  Component,
  Input,
  OnChanges,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels);

@Component({
  selector: 'app-promedio-estadia-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promedio-estadia-chart.component.html',
  styleUrls: ['./promedio-estadia-chart.component.scss'],
})
export class PromedioEstadiaChartComponent implements OnChanges, AfterViewInit {
  @Input() data: any[] = [];
  @ViewChild('graficoVehiculo') canvasRef!: ElementRef<HTMLCanvasElement>;
  chart?: Chart;
  domReady = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    this.domReady = true;
    this.render();
  }

  ngOnChanges() {
    this.render();
  }

  private render() {
    if (!this.domReady || !this.data.length || !isPlatformBrowser(this.platformId)) return;

    const canvas = this.canvasRef.nativeElement;

    this.chart?.destroy();

    const sorted = this.data
      .map(v => ({ ...v, minutos: Number((v.promedio_minutos / 60).toFixed(1)) }))
      .sort((a, b) => b.minutos - a.minutos);

    this.chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: sorted.map(v => v.tipo_vehiculo),
        datasets: [
          {
            data: sorted.map(v => v.minutos),
            backgroundColor: '#1D4ED8',
            borderColor: '#1E40AF',
          },
        ],
      },
      options: {
        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'top',
            color: '#0f172a',
            font: { size: 13, weight: 'bold' },
            formatter: v => v + ' min',
          },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  }
}
