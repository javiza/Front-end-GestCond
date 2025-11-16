import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RegistroVisitasService } from 'src/app/services/registro-visitas/registro-visitas.service';
import { SharedQrService } from 'src/app/services/shared-qr.service';

@Component({
  selector: 'app-registro-visitas',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './registro-visitas.component.html',
  styleUrls: ['./registro-visitas.component.scss'],
})
export class RegistroVisitasComponent {
  nombre = '';
  rut = '';
  patente = '';
  tipo_vehiculo = '';
  autorizado_por = '';
  lugar_destino = '';
  tipo_visita: 'visita' | 'delivery' | 'trabajador' | '' = '';
  mensaje = '';
  cargando = false;

  constructor(
    private registroService: RegistroVisitasService,
    private authService: AuthService,
    private sharedQr: SharedQrService
  ) {}

  /**  Formatea el RUT automáticamente al escribir */
  onRutInput(event: any) {
    const value = (event.target as HTMLInputElement).value ?? '';
    this.rut = this.formatearRut(value.toString());
  }

  /**  Formatear RUT con puntos y guion */
  formatearRut(rut: string): string {
    if (!rut) return '';
    let limpio = rut.replace(/[^0-9kK]/g, '').toUpperCase();
    if (limpio.length <= 1) return limpio;

    let cuerpo = limpio.slice(0, -1);
    let dv = limpio.slice(-1);
    cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${cuerpo}-${dv}`;
  }

  /**  Valida el formato y dígito verificador */
  validarRut(rut: string): boolean {
    if (!rut) return false;
    const rutLimpio = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();
    const cuerpo = rutLimpio.slice(0, -1);
    const dv = rutLimpio.slice(-1);
    if (!/^\d+$/.test(cuerpo)) return false;

    let suma = 0;
    let multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo.charAt(i), 10) * multiplo;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    const dvEsperado = 11 - (suma % 11);
    const dvFinal =
      dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

    return dv === dvFinal;
  }

  registrarIngreso() {
  this.mensaje = '';
  this.cargando = true;

  // QR si existe
  const qrData = this.sharedQr.getQrData();
  const id_autorizacion_qr = qrData?.id ?? undefined;

  // Validar RUT
  if (this.rut && !this.validarRut(this.rut)) {
    this.mensaje = 'RUT inválido. Corrígelo antes de registrar.';
    this.cargando = false;
    return;
  }

  // Hora local de Chile (sin UTC)
  const now = new Date();
const fechaLocal = now.toLocaleString('sv-SE', { hour12: false }).replace(' ', 'T');

  // Body enviado al backend
  const registro: any = {
  autorizado_por: this.autorizado_por.trim(),
  lugar_destino: this.lugar_destino.trim(),
  tipo_visita: this.tipo_visita,
};

  if (id_autorizacion_qr) registro.id_autorizacion_qr = id_autorizacion_qr;
  if (this.nombre) registro.nombre = this.nombre.trim();
  if (this.rut) registro.rut = this.rut.trim();
  if (this.patente) registro.patente = this.patente.trim();
  if (this.tipo_vehiculo) registro.tipo_vehiculo = this.tipo_vehiculo.trim();

  this.registroService.crearRegistro(registro).subscribe({
    next: () => {
      this.mensaje = 'Ingreso registrado correctamente.';
      this.resetFormulario();
    },
    error: (err) => {
      console.error('Error al registrar ingreso:', err);
      this.mensaje = ' Error al registrar el ingreso.';
    },
    complete: () => (this.cargando = false),
  });
}


  resetFormulario() {
    this.nombre = '';
    this.rut = '';
    this.patente = '';
    this.tipo_vehiculo = '';
    this.autorizado_por = '';
    this.lugar_destino = '';
    this.tipo_visita = '';
  }
}
