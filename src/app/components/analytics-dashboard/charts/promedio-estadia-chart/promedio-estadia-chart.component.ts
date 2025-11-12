import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-promedio-estadia-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promedio-estadia-chart.component.html',
  styleUrls: ['./promedio-estadia-chart.component.scss'],
})
export class PromedioEstadiaChartComponent implements OnChanges {
  @Input() data: any[] = [];
  chart?: Chart;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      setTimeout(() => this.renderChart(), 200);
    }
  }

  renderChart() {
    const ctx = document.getElementById('graficoVehiculo') as HTMLCanvasElement | null;
    if (!ctx) return;

    this.chart?.destroy();
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.data.map(v => v.tipo_vehiculo),
        datasets: [{
          label: 'Minutos promedio',
          data: this.data.map(v => v.promedio_minutos),
          backgroundColor: '#001b87',
        }],
      },
      options: { scales: { y: { beginAtZero: true } } },
    });
  }
}
