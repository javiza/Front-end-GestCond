import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RondasService } from 'src/app/services/rondas.service';

@Component({
  selector: 'app-rondas-guardia',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './rondas-guardia.component.html',
  styleUrls: ['./rondas-guardia.component.scss'],
})
export class RondasGuardiaComponent {
  observacion_ronda = '';
  cargando = false;
  mensaje = '';

  constructor(private rondasService: RondasService) {}

  registrarRonda() {
    if (!this.observacion_ronda.trim()) {
      this.mensaje = '⚠️ Debe ingresar una observación.';
      return;
    }

    this.cargando = true;
    this.rondasService.crearRonda({ observacion_ronda: this.observacion_ronda }).subscribe({
      next: () => {
        this.mensaje = '✅ Ronda registrada correctamente.';
        this.observacion_ronda = '';
      },
      error: (err) => {
        console.error(err);
        this.mensaje = '❌ Error al registrar la ronda.';
      },
      complete: () => (this.cargando = false),
    });
  }
}
