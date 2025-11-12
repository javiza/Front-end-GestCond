import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-ingresos-diarios-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ingresos-diarios-chart.component.html',
  styleUrls: ['./ingresos-diarios-chart.component.scss'],
})
export class IngresosDiariosChartComponent implements OnChanges {
  @Input() data: any[] = [];
  chart?: Chart;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      setTimeout(() => this.renderChart(), 200);
    }
  }

  renderChart() {
    const ctx = document.getElementById('graficoDiario') as HTMLCanvasElement | null;
    if (!ctx) return;

    this.chart?.destroy();
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.data.map(d => d.fecha_registro),
        datasets: [{
          label: 'Ingresos diarios',
          data: this.data.map(d => d.total),
          borderColor: '#3b82f6',
          tension: 0.2,
          fill: false,
        }],
      },
    });
  }
}
