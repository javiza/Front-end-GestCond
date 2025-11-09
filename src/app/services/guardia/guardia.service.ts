import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface EmpresaContratista {
  id: number;
  nombre_empresa: string;
}

export interface Guardia {
  id: number;
  nombre: string;
  rut: string;
  telefono?: string;
  email?: string;
  activo: boolean;
  usuario?: any;
  empresaContratista?: EmpresaContratista | null;
}

export interface CreateGuardiaDto {
  nombre: string;
  rut: string;
  telefono?: string;
  email?: string;
  id_usuario?: number;
  id_empresa_contratista?: number;
  activo?: boolean;
}

export interface UpdateGuardiaDto extends Partial<CreateGuardiaDto> {}

@Injectable({
  providedIn: 'root',
})
export class GuardiasService {
  private apiUrl = `${environment.apiUrl}/guardias`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  findAll(): Observable<Guardia[]> {
    return this.http.get<Guardia[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  findOne(id: number): Observable<Guardia> {
    return this.http.get<Guardia>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  create(dto: CreateGuardiaDto): Observable<Guardia> {
    return this.http.post<Guardia>(this.apiUrl, dto, { headers: this.getHeaders() });
  }

  update(id: number, dto: UpdateGuardiaDto): Observable<Guardia> {
    return this.http.put<Guardia>(`${this.apiUrl}/${id}`, dto, { headers: this.getHeaders() });
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
