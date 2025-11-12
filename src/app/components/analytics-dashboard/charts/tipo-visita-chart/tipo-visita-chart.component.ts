import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-tipo-visita-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tipo-visita-chart.component.html',
  styleUrls: ['./tipo-visita-chart.component.scss'],
})
export class TipoVisitaChartComponent implements OnChanges {
  @Input() data: any[] = [];
  chart?: Chart;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      setTimeout(() => this.renderChart(), 200);
    }
  }

  renderChart() {
    const ctx = document.getElementById('graficoTipo') as HTMLCanvasElement | null;
    if (!ctx) return;

    this.chart?.destroy();
    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.data.map(i => i.tipo_visita),
        datasets: [{
          label: 'Visitas',
          data: this.data.map(i => i.total),
          backgroundColor: ['#3b82f6', '#22c55e', '#f97316', '#ef4444', '#6366f1'],
        }],
      },
    });
  }
}
