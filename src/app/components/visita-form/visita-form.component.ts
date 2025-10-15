import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { VisitasService, CreateVisitaDto, Visita } from '../../services/visitas/visitas.service';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-visita-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule, HttpClientModule],
  templateUrl: './visita-form.component.html',
  styleUrls: ['./visita-form.component.scss'],
})
export class VisitaFormComponent {
  private fb = inject(FormBuilder);
  private api = inject(VisitasService);
  private toast = inject(ToastController);

  form: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    rut: ['', [Validators.required, Validators.pattern(/^[0-9]{7,8}-[0-9kK]$/)]],
    id_casa: [1, Validators.required],           // ejemplo: asignar automáticamente una casa
    autorizado_por: [1, Validators.required],     // ejemplo: ID del usuario logueado
  });

  qrGenerado = signal<string | null>(null);
  ultimaVisita = signal<Visita | null>(null);

  constructor() {
    this.cargarUltima();
  }

  async generarQR() {
    if (this.form.invalid) {
      this.presentToast('Completa los campos requeridos antes de generar el código.');
      return;
    }

    const datos = this.form.value;
    const contenido = `VISITA|${datos.nombre}|${datos.rut}|CASA:${datos.id_casa}|${Date.now()}`;
    const qrData = await QRCode.toDataURL(contenido);
    this.qrGenerado.set(qrData);
  }

  guardar() {
    if (this.form.invalid) {
      this.presentToast('Completa los campos requeridos.');
      return;
    }

    const dto: CreateVisitaDto = this.form.value;
    this.api.crear(dto).subscribe({
      next: async (v) => {
        this.ultimaVisita.set(v);
        this.qrGenerado.set(v.codigo_qr);
        await this.presentToast('Visita registrada correctamente.');
        this.form.reset();
      },
      error: async (e) => {
        console.error(e);
        await this.presentToast('Error al registrar la visita.');
      },
    });
  }

  cargarUltima() {
    this.api.ultima().subscribe({
      next: (v) => this.ultimaVisita.set(v),
      error: () => this.ultimaVisita.set(null),
    });
  }

  eliminar(id: number) {
    this.api.eliminar(id).subscribe({
      next: async () => {
        await this.presentToast('Visita eliminada.');
        this.ultimaVisita.set(null);
      },
    });
  }

  async presentToast(msg: string) {
    const t = await this.toast.create({ message: msg, duration: 2000, position: 'bottom' });
    await t.present();
  }
    descargarQR() {
    const qr = this.qrGenerado();
    if (!qr) return;

    const link = document.createElement('a');
    link.href = qr;
    link.download = `QR_${this.form.get('nombre')?.value || 'visita'}.png`;
    link.click();
  }

  descargarQRUltima() {
    const qr = this.ultimaVisita()?.codigo_qr;
    if (!qr) return;

    const link = document.createElement('a');
    link.href = qr;
    link.download = `QR_${this.ultimaVisita()?.nombre || 'visita'}.png`;
    link.click();
  }

}
