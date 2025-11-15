import {
  Component,
  Input,
  OnChanges,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-ingresos-hora-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ingresos-hora-chart.component.html',
  styleUrls: ['./ingresos-hora-chart.component.scss'],
})
export class IngresosHoraChartComponent implements OnChanges, AfterViewInit {
  @Input() data: any[] = [];
  @ViewChild('graficoHora') canvasRef!: ElementRef<HTMLCanvasElement>;
  domReady = false;
  chart?: Chart;

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

    const sorted = [...this.data].sort((a, b) => a.hora_ingreso - b.hora_ingreso);

    this.chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: sorted.map(h => `${h.hora_ingreso}:00`),
        datasets: [
          {
            data: sorted.map(h => h.total),
            borderColor: '#16A34A',
            backgroundColor: 'rgba(22,163,74,0.25)',
            fill: true,
            tension: 0.4,
            pointRadius: 6,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1, callback: v => v },
          },
        },
        plugins: { legend: { display: false } },
      },
    });
  }
}
