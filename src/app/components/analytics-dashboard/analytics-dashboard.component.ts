import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



import {
  IonContent,
  IonButton,
  IonDatetime,
  IonInput,
  IonItem,
  IonLabel
} from '@ionic/angular/standalone';

import { ToastController } from '@ionic/angular';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';

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
    IonContent,
    IonButton,
    IonDatetime,
    IonInput,
    IonItem,
    IonLabel,
    TipoVisitaChartComponent,
    PromedioEstadiaChartComponent,
    IngresosHoraChartComponent,
    IngresosDiariosChartComponent,
  ],
  templateUrl: './analytics-dashboard.component.html',
  styleUrls: ['./analytics-dashboard.component.scss'],
})
export class AnalyticsDashboardComponent implements OnInit {

  filtro: {
  desde: string | null;
  hasta: string | null;
  tipo_visita: string;
  tipo_vehiculo: string;
} = {
  desde: null,
  hasta: null,
  tipo_visita: '',
  tipo_vehiculo: ''
};

  ingresosPorTipo: any[] = [];
  promedioEstadia: any[] = [];
  ingresosPorHora: any[] = [];
  ingresosDiarios: any[] = [];

  cargando = false;

  constructor(
    private analyticsService: AnalyticsService,
    private toastCtrl: ToastController
  ) {
   
  }

  ngOnInit() {
    // Carga cada gráfico por separado para que no bloquee todo
    this.cargarIngresosPorTipo();
    this.cargarPromedioEstadia();
    this.cargarIngresosHora();
    this.cargarIngresosDiarios();
  }

  formatearFechaISO(fecha: string | null) {
    if (!fecha || fecha.trim() === '') return '';
    return fecha.split('T')[0];
  }

  getFiltro() {
    return {
      desde: this.formatearFechaISO(this.filtro.desde),
      hasta: this.formatearFechaISO(this.filtro.hasta),
      tipo_visita: this.filtro.tipo_visita,
      tipo_vehiculo: this.filtro.tipo_vehiculo,
    };
  }

  async cargarIngresosPorTipo() {
    try {
      this.ingresosPorTipo = await this.analyticsService
        .obtenerIngresosPorTipo(this.getFiltro())
        .toPromise() ?? [];
    } catch (error) {

    console.error('Error ingresos tipo:', error);

  }
  }

  async cargarPromedioEstadia() {
    try {
      this.promedioEstadia = await this.analyticsService
        .obtenerPromedioEstadia(this.getFiltro())
        .toPromise() ?? [];
    } catch(error) {

    console.error('Error ingresos tipo:', error);

  }
  }

  async cargarIngresosHora() {
    try {
      this.ingresosPorHora = await this.analyticsService
        .obtenerIngresosPorHora(this.getFiltro())
        .toPromise() ?? [];
    } catch (error) {
      console.error('Error ingresos por hora:', error);
    }
  }

  async cargarIngresosDiarios() {
    try {
      this.ingresosDiarios = await this.analyticsService
        .obtenerIngresosDiarios(this.getFiltro())
        .toPromise() ?? [];
    } catch (error) {
      console.error('Error ingresos diarios:', error);
    }
  }

    limpiarFiltros() {
    this.filtro = { desde: null , hasta: null, tipo_visita: '', tipo_vehiculo: '' };

    this.cargarIngresosPorTipo();
    this.cargarPromedioEstadia();
    this.cargarIngresosHora();
    this.cargarIngresosDiarios();
  }

  aplicarFiltros() {
    this.cargarIngresosPorTipo();
    this.cargarPromedioEstadia();
    this.cargarIngresosHora();
    this.cargarIngresosDiarios();
  }

}
