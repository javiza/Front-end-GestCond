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
  selector: 'app-ingresos-diarios-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ingresos-diarios-chart.component.html',
  styleUrls: ['./ingresos-diarios-chart.component.scss'],
})
export class IngresosDiariosChartComponent implements OnChanges, AfterViewInit {
  @Input() data: any[] = [];
  @ViewChild('graficoDiario') canvasRef!: ElementRef<HTMLCanvasElement>;
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
    const ctx = canvas.getContext('2d')!;

    this.chart?.destroy();

    const sorted = [...this.data].sort(
      (a, b) =>
        new Date(a.fecha_registro).getTime() - new Date(b.fecha_registro).getTime()
    );

    const fechas = sorted.map(d =>
      new Date(d.fecha_registro).toLocaleDateString('es-CL', {
        day: '2-digit',
        month: 'short',
      })
    );

    const totales = sorted.map(d => Math.round(Number(d.total) || 0));

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(59,130,246,.5)');
    gradient.addColorStop(1, 'rgba(59,130,246,0)');

    this.chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: fechas,
        datasets: [
          {
            data: totales,
            borderColor: '#2563eb',
            backgroundColor: gradient,
            fill: true,
            tension: 0.3,
            pointRadius: 5,
            borderWidth: 3,
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
