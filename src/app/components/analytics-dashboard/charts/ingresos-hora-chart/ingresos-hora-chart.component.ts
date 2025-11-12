import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-ingresos-hora-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ingresos-hora-chart.component.html',
  styleUrls: ['./ingresos-hora-chart.component.scss'],
})
export class IngresosHoraChartComponent implements OnChanges {
  @Input() data: any[] = [];
  chart?: Chart;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      setTimeout(() => this.renderChart(), 200);
    }
  }

  renderChart() {
    const ctx = document.getElementById('graficoHora') as HTMLCanvasElement | null;
    if (!ctx) return;

    this.chart?.destroy();
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.data.map(h => h.hora_ingreso),
        datasets: [{
          label: 'Ingresos por hora',
          data: this.data.map(h => h.total),
          borderColor: '#22c55e',
          tension: 0.3,
          fill: false,
        }],
      },
    });
  }
}
