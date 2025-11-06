import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Guardia {
  id: number;
  nombre: string;
}

export interface Turno {
  id: number;
  fecha_hora_inicio: string;
  fecha_hora_termino?: string;
  guardia?: Guardia;
}

export interface Ronda {
  id?: number;
  observacion_ronda: string;
  fecha_hora_inicio?: string;
  fecha_hora_termino?: string;
  turno?: Turno;
}

@Injectable({
  providedIn: 'root',
})
export class RondasService {
  private apiUrl = `${environment.apiUrl}/rondas`;

  constructor(private http: HttpClient) {}

  /** 🔹 Crear nueva ronda */
  crearRonda(data: { observacion_ronda: string }): Observable<Ronda> {
    return this.http.post<Ronda>(this.apiUrl, data);
  }

  /** 🔹 Listar todas las rondas */
  getRondas(): Observable<Ronda[]> {
    return this.http.get<Ronda[]>(this.apiUrl);
  }

  /** 🔹 Eliminar ronda (opcional, solo admin) */
  eliminarRonda(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
