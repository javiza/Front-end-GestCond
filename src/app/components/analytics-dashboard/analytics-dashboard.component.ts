import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';

// Subcomponentes
import { TipoVisitaChartComponent } from './charts/tipo-visita-chart/tipo-visita-chart.component';
import { PromedioEstadiaChartComponent } from './charts/promedio-estadia-chart/promedio-estadia-chart.component';
import { IngresosHoraChartComponent } from './charts/ingresos-hora-chart/ingresos-hora-chart.component';
import { IngresosDiariosChartComponent } from './charts/ingresos-diarios-chart/ingresos-diarios-chart.component';

@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TipoVisitaChartComponent,
    PromedioEstadiaChartComponent,
    IngresosHoraChartComponent,
    IngresosDiariosChartComponent,
  ],
  templateUrl: './analytics-dashboard.component.html',
  styleUrls: ['./analytics-dashboard.component.scss'],
})
export class AnalyticsDashboardComponent implements OnInit {
  filtro = { desde: '', hasta: '', tipo_visita: '', tipo_vehiculo: '' };

  ingresosPorTipo: any[] = [];
  promedioEstadia: any[] = [];
  ingresosPorHora: any[] = [];
  ingresosDiarios: any[] = [];

  cargando = false;

  constructor(
    private analyticsService: AnalyticsService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.cargarDatos();
  }

  async cargarDatos() {
    this.cargando = true;
    try {
      const filtro = { ...this.filtro };

      const [tipos, vehiculos, horas, diarios] = await Promise.all([
        this.analyticsService.obtenerIngresosPorTipo(filtro).toPromise(),
        this.analyticsService.obtenerPromedioEstadia(filtro).toPromise(),
        this.analyticsService.obtenerIngresosPorHora(filtro).toPromise(),
        this.analyticsService.obtenerIngresosDiarios(filtro).toPromise(),
      ]);

      this.ingresosPorTipo = tipos ?? [];
      this.promedioEstadia = vehiculos ?? [];
      this.ingresosPorHora = horas ?? [];
      this.ingresosDiarios = diarios ?? [];
    } catch (error) {
      console.error(error);
      const toast = await this.toastCtrl.create({
        message: 'Error al cargar datos analíticos',
        color: 'danger',
        duration: 2500,
      });
      toast.present();
    } finally {
      this.cargando = false;
    }
  }

  limpiarFiltros() {
    this.filtro = { desde: '', hasta: '', tipo_visita: '', tipo_vehiculo: '' };
    this.cargarDatos();
  }
}
