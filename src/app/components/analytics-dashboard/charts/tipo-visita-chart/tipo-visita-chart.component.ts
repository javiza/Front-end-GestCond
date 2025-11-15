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
  selector: 'app-tipo-visita-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tipo-visita-chart.component.html',
  styleUrls: ['./tipo-visita-chart.component.scss'],
})
export class TipoVisitaChartComponent implements OnChanges, AfterViewInit {
  @Input() data: any[] = [];
  @ViewChild('graficoTipo') canvasRef!: ElementRef<HTMLCanvasElement>;
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

    const sorted = [...this.data].sort((a, b) => b.total - a.total);

    this.chart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: sorted.map(i => i.tipo_visita),
        datasets: [
          {
            data: sorted.map(i => i.total),
            backgroundColor: ['#2563eb', '#16a34a', '#f97316', '#dc2626', '#7e22ce'],
            borderWidth: 0,
            hoverOffset: 12,
          },
        ],
      },
      options: {
        cutout: '55%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { font: { size: 14 }, color: '#1e293b' },
          },
          datalabels: {
            color: '#fff',
            font: { size: 13, weight: 'bold' },
            formatter: (value, ctx) => {
              const dataset = ctx.chart.data.datasets[0].data as number[];
              const total = dataset.reduce((a, b) => a + b, 0);
              return ((value / total) * 100).toFixed(1) + '%';
            },
          },
        },
      },
    });
  }
}
