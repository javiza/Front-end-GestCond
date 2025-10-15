import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Casa {
  id: number;
  numero: string;
  direccion: string;
  fecha_creacion?: string;
}

export interface CreateCasaDto {
  numero: string;
  direccion: string;
}

export interface UpdateCasaDto {
  numero?: string;
  direccion?: string;
}

@Injectable({ providedIn: 'root' })
export class CasasService {
  private apiUrl = `${environment.apiUrl}/casas`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

 findAll(): Observable<Casa[]> {
    return this.http.get<Casa[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  findOne(id: number): Observable<Casa> {
    return this.http.get<Casa>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  create(dto: CreateCasaDto): Observable<Casa> {
    return this.http.post<Casa>(this.apiUrl, dto, { headers: this.getHeaders() });
  }

  update(id: number, dto: UpdateCasaDto): Observable<Casa> {
    return this.http.put<Casa>(`${this.apiUrl}/${id}`, dto, { headers: this.getHeaders() });
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
