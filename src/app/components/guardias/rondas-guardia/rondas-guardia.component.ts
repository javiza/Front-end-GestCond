import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RondasService, Ronda } from 'src/app/services/rondas/rondas.service';

@Component({
  selector: 'app-rondas-guardia',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './rondas-guardia.component.html',
  styleUrls: ['./rondas-guardia.component.scss'],
})
export class RondasGuardiaComponent implements OnInit {

  observacion_inicio = '';
  observacion_termino = '';
  mensaje = '';
  cargando = false;

  rondaActiva: Ronda | null = null;

  constructor(private rondasService: RondasService) {}

  ngOnInit() {
    this.cargarRondas();
  }

  cargarRondas() {
    this.rondasService.getRondas().subscribe({
      next: (data) => {
this.rondaActiva = data.find(r =>
  r.fecha_hora_termino === null || r.fecha_hora_termino === undefined
) || null;
      },
      error: () => {}
    });
  }

  iniciarRonda() {
    if (!this.observacion_inicio.trim()) {
      this.mensaje = 'Debe ingresar una observación de inicio.';
      return;
    }

    this.cargando = true;

    this.rondasService.crearRonda({
      observacion_ronda: this.observacion_inicio
    }).subscribe({
      next: (res) => {
        this.rondaActiva = res;
        this.observacion_inicio = '';
        this.mensaje = 'Ronda iniciada correctamente.';
      },
      error: () => {
        this.mensaje = 'Error al iniciar la ronda.';
      },
      complete: () => (this.cargando = false),
    });
  }

  cerrarRonda() {
    if (!this.rondaActiva) {
      this.mensaje = 'No hay una ronda activa.';
      return;
    }

    if (!this.observacion_termino.trim()) {
      this.mensaje = 'Debe ingresar una observación de término.';
      return;
    }

    this.cargando = true;

    this.rondasService.actualizarRonda(this.rondaActiva.id!, {
      observacion_ronda: this.observacion_termino
    }).subscribe({
      next: (res) => {
        this.mensaje = 'Ronda finalizada correctamente.';
        this.rondaActiva = null;
        this.observacion_termino = '';
      },
      error: () => {
        this.mensaje = 'Error al finalizar la ronda.';
      },
      complete: () => (this.cargando = false),
    });
  }

}
