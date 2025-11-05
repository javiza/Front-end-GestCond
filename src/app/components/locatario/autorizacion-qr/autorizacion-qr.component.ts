import { Component } from '@angular/core';
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
  motivo = '';
  nombre_visita = ''; // 👈 nuevo campo obligatorio
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

    // Obtener el usuario autenticado
    const id_usuario = this.authService.getUserId();
    if (!id_usuario) {
      this.mensaje = '⚠️ Error: No se pudo identificar al usuario autenticado.';
      this.cargando = false;
      return;
    }

    // Validar campo requerido
    if (!this.nombre_visita.trim()) {
      this.mensaje = '⚠️ Debes ingresar el nombre de la persona o visita.';
      this.cargando = false;
      return;
    }

    // Generar código QR único
    const codigo = 'QR-' + Math.random().toString(36).substring(2, 10).toUpperCase();

    const nuevaAutorizacion: AutorizacionQR = {
      codigo_qr: codigo,
      nombre_visita: this.nombre_visita,
      motivo: this.motivo,
      id_usuario
    };

    // Llamada al backend
    this.autorizacionService.crearAutorizacion(nuevaAutorizacion).subscribe({
      next: async () => {
        this.codigo_qr = codigo;
        this.qrImageUrl = await QRCode.toDataURL(codigo);
        this.qrCreado = true;
        this.mensaje = 'Autorización creada correctamente.';
        this.mostrarNuevoBoton = true;
      },
      error: (err) => {
        console.error(err);
        this.mensaje = 'Error al crear la autorización.';
      },
      complete: () => (this.cargando = false)
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
}
