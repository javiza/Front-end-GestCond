import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private apiUrl = `${environment.apiUrl}/analytics`; 

  private http = inject(HttpClient);

  getVisitasMayorEstadia(limit = 10): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/visitas-mayor-estadia?limit=${limit}`);
  }

  getGuardiasActividad(mes: number, anio: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/guardias-actividad?mes=${mes}&anio=${anio}`);
  }

  getDeliverysExcedidos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/deliverys-excedidos`);
  }

  getFlujoSemanal(mes: number, anio: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/flujo-semanal?mes=${mes}&anio=${anio}`);
  }
}
