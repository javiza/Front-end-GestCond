import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  standalone: true,
  selector: 'app-analytics-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './analytics-dashboard.component.html',
  styleUrls: ['./analytics-dashboard.component.css']
})
export class AnalyticsDashboardComponent implements OnInit {
  private analyticsService = inject(AnalyticsService);

  visitas: any[] = [];
  guardias: any[] = [];
  deliverys: any[] = [];
  flujo: any[] = [];

  mesSeleccionado = new Date().getMonth() + 1;
  anioSeleccionado = new Date().getFullYear();

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.analyticsService.getVisitasMayorEstadia().subscribe(res => this.visitas = res);
    this.analyticsService.getGuardiasActividad(this.mesSeleccionado, this.anioSeleccionado).subscribe(res => this.guardias = res);
    this.analyticsService.getDeliverysExcedidos().subscribe(res => this.deliverys = res);
    this.analyticsService.getFlujoSemanal(this.mesSeleccionado, this.anioSeleccionado).subscribe(res => {
      this.flujo = res;
      this.renderChart();
    });
  }

  renderChart() {
    const ctx = document.getElementById('flujoChart') as HTMLCanvasElement;
    const labels = this.flujo.map(f => f.dia_semana);
    const data = this.flujo.map(f => f.promedio_diario);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Promedio de ingresos por día',
          data,
          backgroundColor: [
            '#4A148C', '#6A1B9A', '#8E24AA', '#AB47BC',
            '#BA68C8', '#CE93D8', '#E1BEE7'
          ],
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
}
