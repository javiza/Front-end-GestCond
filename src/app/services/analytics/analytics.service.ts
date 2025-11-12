import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private apiUrl = `${environment.apiUrl}/analytics`;

  constructor(private http: HttpClient) {}

  obtenerIngresosPorTipo(filtro: any) {
    return this.http.get<any[]>(`${this.apiUrl}/ingresos-por-tipo`, { params: filtro });
  }

  obtenerPromedioEstadia(filtro: any) {
    return this.http.get<any[]>(`${this.apiUrl}/promedio-estadia`, { params: filtro });
  }

  obtenerIngresosPorHora(filtro: any) {
    return this.http.get<any[]>(`${this.apiUrl}/ingresos-por-hora`, { params: filtro });
  }

  obtenerIngresosDiarios(filtro: any) {
    return this.http.get<any[]>(`${this.apiUrl}/ingresos-diarios`, { params: filtro });
  }

  refrescarVista() {
    return this.http.post(`${this.apiUrl}/refrescar`, {});
  }
}
