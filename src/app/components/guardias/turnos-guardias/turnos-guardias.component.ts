import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TurnosService, Turno, Guardia } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-turnos-guardias',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './turnos-guardias.component.html',
  styleUrls: ['./turnos-guardias.component.scss'],
})
export class TurnosGuardiasComponent implements OnInit {
  observacion_inicio = '';
  observacion_termino = '';
  cargando = false;
  mensaje = '';
  turnoActivo: Turno | null = null;

  /** 👇 NUEVOS CAMPOS */
  guardias: Guardia[] = [];
  id_guardia: number | null = null;

  constructor(private turnosService: TurnosService) {}

  ngOnInit() {
    this.cargarTurnos();
    this.cargarGuardias(); // 👈 cargar los nombres de guardias
  }

  /** Cargar para verificar si hay un turno activo */
  cargarTurnos() {
    this.turnosService.getTurnos().subscribe({
      next: (data) => {
        this.turnoActivo = data.find((t) => !t.observacion_termino) || null;
      },
      error: (err) => console.error('Error al cargar turnos:', err),
    });
  }

  /** 🔹 Cargar lista de guardias */
  cargarGuardias() {
    this.turnosService.getGuardias().subscribe({
      next: (data) => (this.guardias = data),
      error: (err) => console.error('Error al cargar guardias:', err),
    });
  }

  /** Iniciar turno */
  iniciarTurno() {
    if (!this.observacion_inicio.trim()) {
      this.mensaje = '⚠️ Debe ingresar una observación de inicio.';
      return;
    }

    if (!this.id_guardia) {
      this.mensaje = '⚠️ Debe seleccionar un guardia.';
      return;
    }

    this.cargando = true;
    this.turnosService.crearTurno({
      observacion_inicio: this.observacion_inicio,
      id_guardia: this.id_guardia, // 👈 se envía al backend
    }).subscribe({
      next: (res) => {
        this.mensaje = '✅ Turno iniciado correctamente.';
        this.observacion_inicio = '';
        this.id_guardia = null;
        this.turnoActivo = res;
      },
      error: (err) => {
        console.error(err);
        this.mensaje = '❌ Error al iniciar el turno.';
      },
      complete: () => (this.cargando = false),
    });
  }

  /** Cerrar turno */
  cerrarTurno() {
    if (!this.turnoActivo) {
      this.mensaje = '⚠️ No hay un turno activo para cerrar.';
      return;
    }

    if (!this.observacion_termino.trim()) {
      this.mensaje = '⚠️ Debe ingresar una observación de término.';
      return;
    }

    this.cargando = true;
    this.turnosService
      .cerrarTurno(this.turnoActivo.id!, { observacion_termino: this.observacion_termino })
      .subscribe({
        next: () => {
          this.mensaje = '✅ Turno cerrado correctamente.';
          this.observacion_termino = '';
          this.turnoActivo = null;
        },
        error: (err) => {
          console.error(err);
          this.mensaje = '❌ Error al cerrar el turno.';
        },
        complete: () => (this.cargando = false),
      });
  }
}
