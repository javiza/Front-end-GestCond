import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { io, Socket } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class RegistroVisitasService {
  private apiUrl = `${environment.apiUrl}/registros-ingresos`;

  private socket: Socket;

  constructor(private http: HttpClient) {
    // Conecta automáticamente al backend WebSocket
    this.socket = io(environment.apiUrl, {
      transports: ['websocket'],   // Fuerza WebSocket
      autoConnect: true,
      reconnection: true,
    });
  }

  crearRegistro(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  obtenerRegistros(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  obtenerTodasLasVisitas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/todas`);
  }

  marcarSalida(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/salida`, {});
  }

  getDeliveriesLargos() {
    return this.http.get<any[]>(`${this.apiUrl}/deliveries-largos`);
  }

  // ESCUCHAR ALERTAS DESDE EL BACKEND
  onAlertaDelivery(callback: (data: any) => void) {
  this.socket.on('alerta-delivery', callback);

  // devolver función para off()
  return {
    unsubscribe: () => this.socket.off('alerta-delivery', callback)
  };
}


  marcarLeida(id: number) {
    return this.http.patch(`${this.apiUrl}/${id}/alerta-leida`, {});
  }
}
