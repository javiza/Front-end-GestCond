import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Guardia {
  id: number;
  nombre: string;
}

export interface Turno {
  id?: number;
  observacion_inicio?: string;
  observacion_termino?: string;
  fecha_hora_inicio?: string;
  fecha_hora_termino?: string;
  guardia?: {
    id: number;
    nombre: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class TurnosService {
  private apiUrl = `${environment.apiUrl}/turnos`;
  private guardiasUrl = `${environment.apiUrl}/guardias`; 

  constructor(private http: HttpClient) {}

  /** Registrar inicio de turno */
  crearTurno(data: { observacion_inicio: string; id_guardia: number }): Observable<Turno> { 
    return this.http.post<Turno>(this.apiUrl, data);
  }

  /** Cerrar turno activo */
  cerrarTurno(id: number, data: { observacion_termino: string }): Observable<Turno> {
    return this.http.put<Turno>(`${this.apiUrl}/${id}/cerrar`, data);
  }

  /** Obtener todos los turnos */
  getTurnos(): Observable<Turno[]> {
    return this.http.get<Turno[]>(this.apiUrl);
  }

  /** 🔹 Obtener lista de guardias */
  getGuardias(): Observable<Guardia[]> {
    return this.http.get<Guardia[]>(this.guardiasUrl);
  }
}
