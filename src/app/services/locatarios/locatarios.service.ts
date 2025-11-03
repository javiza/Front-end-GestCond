import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Locatario {
  id: number;
  nombre: string;
  rut: string;
  email: string;
  rol: 'locatario';
  activo: boolean;
  fecha_creacion: string;
  casa?: {
    id: number;
    numero: string;
    direccion: string;
  };
}

export interface CreateLocatarioDto {
  nombre: string;
  rut: string;
  email: string;
  password: string;
  id_casa: number;
}

export interface UpdateLocatarioDto {
  nombre?: string;
  rut?: string;
  email?: string;
  password?: string;
  id_casa?: number;
}

@Injectable({ providedIn: 'root' })
export class LocatariosService {
  private apiUrl = `${environment.apiUrl}/locatarios`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  findAll(): Observable<Locatario[]> {
    return this.http.get<Locatario[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  findOne(id: number): Observable<Locatario> {
    return this.http.get<Locatario>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  create(dto: CreateLocatarioDto): Observable<Locatario> {
    return this.http.post<Locatario>(this.apiUrl, dto, { headers: this.getHeaders() });
  }

  update(id: number, dto: UpdateLocatarioDto): Observable<Locatario> {
    return this.http.put<Locatario>(`${this.apiUrl}/${id}`, dto, { headers: this.getHeaders() });
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
  getDetail(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
}
}
