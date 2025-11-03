import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Residente {
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

export interface CreateResidenteDto {
  nombre: string;
  rut: string;
  email: string;
  id_casa: number;
  id_usuario: number;
  activo: boolean; 
}

export interface UpdateResidenteDto {
   nombre?: string;
  rut?: string;
  email?: string;
  id_casa?: number;
}
@Injectable({
  providedIn: 'root'
})
export class ResidentesService {
 private apiUrl = `${environment.apiUrl}/residentes`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

 findAll(): Observable<Residente[]> {
    return this.http.get<Residente[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  findOne(id: number): Observable<Residente> {
    return this.http.get<Residente>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  create(dto: CreateResidenteDto): Observable<Residente> {
    return this.http.post<Residente>(this.apiUrl, dto, { headers: this.getHeaders() });
  }

  update(id: number, dto: UpdateResidenteDto): Observable<Residente> {
    return this.http.put<Residente>(`${this.apiUrl}/${id}`, dto, { headers: this.getHeaders() });
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
