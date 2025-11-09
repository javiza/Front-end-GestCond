import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Trabajo {
  id: number;
  trabajo_realizado: string;
  fecha_inicio: string;
  fecha_termino?: string | null;
  personal_interno?: {
    id: number;
    nombre: string;
    rut: string;
    cargo: string;
  };
}

export interface CreateTrabajoDto {
  trabajo_realizado: string;
  fecha_inicio?: string;
  fecha_termino?: string;
  id_personal_interno: number;
}

export interface UpdateTrabajoDto {
  trabajo_realizado?: string;
  fecha_inicio?: string;
  fecha_termino?: string;
  id_personal_interno?: number;
}

@Injectable({
  providedIn: 'root',
})
export class TrabajosService {
  private apiUrl = `${environment.apiUrl}/trabajos`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  findAll(): Observable<Trabajo[]> {
    return this.http.get<Trabajo[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  findOne(id: number): Observable<Trabajo> {
    return this.http.get<Trabajo>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  create(dto: CreateTrabajoDto): Observable<Trabajo> {
    return this.http.post<Trabajo>(this.apiUrl, dto, { headers: this.getHeaders() });
  }

  update(id: number, dto: UpdateTrabajoDto): Observable<Trabajo> {
    return this.http.put<Trabajo>(`${this.apiUrl}/${id}`, dto, { headers: this.getHeaders() });
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
