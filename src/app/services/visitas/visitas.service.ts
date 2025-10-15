import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Visita {
  id: number;
  nombre: string;
  rut: string;
  codigo_qr: string;
  fecha_autorizacion: string;
  casa?: { id: number; direccion?: string };
  autorizado_por?: { id: number; nombre_usuario?: string };
}

export interface CreateVisitaDto {
  nombre: string;
  rut: string;
  id_casa: number;
  autorizado_por: number;
}

@Injectable({ providedIn: 'root' })
export class VisitasService {
  private apiUrl = 'http://localhost:3000/visitas';

  constructor(private http: HttpClient) {}

  crear(dto: CreateVisitaDto): Observable<Visita> {
    return this.http.post<Visita>(this.apiUrl, dto);
  }

  listar(): Observable<Visita[]> {
    return this.http.get<Visita[]>(this.apiUrl);
  }

  ultima(): Observable<Visita> {
    return this.http.get<Visita>(`${this.apiUrl}/ultima`);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  actualizar(id: number, dto: Partial<CreateVisitaDto>): Observable<Visita> {
    return this.http.put<Visita>(`${this.apiUrl}/${id}`, dto);
  }
}
