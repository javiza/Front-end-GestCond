import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket = io('https://back-end-gestcond-0lpi.onrender.com'); 
  // URL real

  onRegistroActualizado(callback: (data: any) => void) {
    this.socket.on('actualizarRegistros', callback);
  }
}
