import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface Vehiculo {
  id: number;
  nombre_dueno: string; // usado en el front
  patente: string;
  marca: string;
  modelo: string;
  color: string;
  tipo_vehiculo: string;
  casa?: {
    id: number;
    numero: string;
    direccion: string;
  };
}

export interface CreateVehiculoDto {
  nombre_dueno: string; // enviado al back
  patente: string;
  marca: string;
  modelo: string;
  color: string;
  tipo_vehiculo: string;
  id_casa: number;
}

export interface UpdateVehiculoDto {
  nombre_dueno?: string;
  patente?: string;
  marca?: string;
  modelo?: string;
  color?: string;
  tipo_vehiculo?: string;
  id_casa?: number;
}

@Injectable({
  providedIn: 'root',
})
export class VehiculosService {
  private apiUrl = `${environment.apiUrl}/vehiculos`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  findAll(): Observable<Vehiculo[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      map((vehiculos) =>
        vehiculos.map((v) => ({
          ...v,
          nombre_dueno: v.nombre_dueno, // convierte al formato del front
        }))
      )
    );
  }

  findOne(id: number): Observable<Vehiculo> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      map((v) => ({
        ...v,
        nombre_dueno: v.nombre_dueno,
      }))
    );
  }

  create(dto: CreateVehiculoDto): Observable<Vehiculo> {
    return this.http.post<Vehiculo>(this.apiUrl, dto, { headers: this.getHeaders() });
  }

  update(id: number, dto: UpdateVehiculoDto): Observable<Vehiculo> {
    return this.http.put<Vehiculo>(`${this.apiUrl}/${id}`, dto, { headers: this.getHeaders() });
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
