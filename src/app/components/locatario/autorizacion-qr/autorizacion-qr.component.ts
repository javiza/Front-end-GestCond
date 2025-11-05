import { Component, Output, EventEmitter  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AutorizacionQrService, AutorizacionQR } from 'src/app/services/autorizacion-qr.service';
import * as QRCode from 'qrcode';


@Component({
  selector: 'app-autorizacion-qr',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './autorizacion-qr.component.html',
  styleUrls: ['./autorizacion-qr.component.scss']
})
export class AutorizacionQrComponent {
  @Output() autorizacionCreada = new EventEmitter<void>();

  motivo = '';
  nombre_visita = ''; // nuevo campo obligatorio
  codigo_qr = '';
  qrImageUrl = ''; // imagen base64 del QR
  mensaje = '';
  qrCreado = false;
  cargando = false;
  mostrarNuevoBoton = false;

  constructor(
    private autorizacionService: AutorizacionQrService,
    private authService: AuthService
  ) {}

  async generarQR() {
  this.cargando = true;
  this.mensaje = '';
  this.qrCreado = false;
  this.mostrarNuevoBoton = false;
  this.autorizacionCreada.emit();

  const id_usuario = this.authService.getUserId();
  if (!id_usuario) {
    this.mensaje = 'Error: No se pudo identificar al usuario autenticado.';
    this.cargando = false;
    return;
  }

  if (!this.nombre_visita.trim()) {
    this.mensaje = ' Debes ingresar el nombre de la persona o visita.';
    this.cargando = false;
    return;
  }

  const codigo = 'QR-' + Math.random().toString(36).substring(2, 10).toUpperCase();

  const nuevaAutorizacion: AutorizacionQR = {
    codigo_qr: codigo,
    nombre_visita: this.nombre_visita.trim(),
    motivo: this.motivo?.trim() || '',
    id_usuario,
  };

  this.autorizacionService.crearAutorizacion(nuevaAutorizacion).subscribe({
    next: async (res) => {
      this.codigo_qr = codigo;
      this.qrImageUrl = await QRCode.toDataURL(codigo);
      this.qrCreado = true;
      this.mensaje = 'Autorización creada correctamente.';
      this.mostrarNuevoBoton = true;
      console.log('Autorización creada:', res);
      this.autorizacionCreada.emit();
      // NO LIMPIAR AQUÍ, SE HACE DESDE EL BOTÓN "Generar Nueva Visita"
    },
    error: (err) => {
      console.error('Error al crear autorización:', err);
      this.mensaje = 'Error al crear la autorización.';
    },
    complete: () => (this.cargando = false),
  });
}


  nuevaVisita() {
    this.motivo = '';
    this.nombre_visita = '';
    this.codigo_qr = '';
    this.qrImageUrl = '';
    this.qrCreado = false;
    this.mensaje = '';
    this.mostrarNuevoBoton = false;
  }

    /** Descargar la imagen QR generada */
  descargarQR() {
    if (!this.qrImageUrl) {
      this.mensaje = 'No hay código QR para descargar.';
      return;
    }

    const enlace = document.createElement('a');
    enlace.href = this.qrImageUrl;
    enlace.download = `${this.codigo_qr}.png`; // nombre del archivo
    enlace.click();
  }

}
