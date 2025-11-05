import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AutorizacionQR {
  id?: number;
  codigo_qr: string;
  nombre_visita: string;
  motivo?: string;
  id_usuario?: number;
  fecha_hora?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutorizacionQrService {
  private apiUrl = 'http://localhost:3000/autorizacion-qr'; //cámbiarlo si se usa Render

  constructor(private http: HttpClient) {}

  crearAutorizacion(data: AutorizacionQR): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
