import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

//  interfaz EXACTA según backend (Swagger + entidad)
export interface EmpresaContratista {
  id: number;
  nombre_empresa: string;
  nombre_encargado: string;
}

export interface Personal {
  id: number;
  nombre: string;
  rut: string;
  cargo: string;
  activo: boolean;
  empresa_contratista?: EmpresaContratista | null; // 
}


//  DTOs alineados con backend
export interface CreatePersonalDto {
  nombre: string;
  rut: string;
  cargo: string;
  id_empresa_contratista?: number;
  activo?: boolean;
}

export interface UpdatePersonalDto {
  nombre?: string;
  rut?: string;
  cargo?: string;
  id_empresa_contratista?: number;
  activo?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PersonalService {
  private apiUrl = `${environment.apiUrl}/personal-interno`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  findAll(): Observable<Personal[]> {
    return this.http.get<Personal[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  findOne(id: number): Observable<Personal> {
    return this.http.get<Personal>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  create(dto: CreatePersonalDto): Observable<Personal> {
    return this.http.post<Personal>(this.apiUrl, dto, { headers: this.getHeaders() });
  }

  update(id: number, dto: UpdatePersonalDto): Observable<Personal> {
    return this.http.put<Personal>(`${this.apiUrl}/${id}`, dto, { headers: this.getHeaders() });
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
