import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface AutorizacionQR {
  id?: number;
  codigo_qr: string;
  nombre_visita: string;
  motivo?: string;
  id_usuario?: number;
  fecha_hora?: string;
  usuario?: { id: number; nombre: string; email: string };
}

@Injectable({
  providedIn: 'root'
})
export class AutorizacionQrService {
  private apiUrl = `${environment.apiUrl}/autorizacion-qr`; // base URL

  constructor(private http: HttpClient) {}

  crearAutorizacion(data: AutorizacionQR): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // Obtener autorizaciones QR de un usuario específico
  getByUsuario(id_usuario: number): Observable<AutorizacionQR[]> {
    return this.http.get<AutorizacionQR[]>(`${this.apiUrl}/usuario/${id_usuario}`);
  }
  getMine(): Observable<AutorizacionQR[]> {
  return this.http.get<AutorizacionQR[]>(`${this.apiUrl}/mis-autorizaciones`);
}
}
