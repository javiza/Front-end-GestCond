import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RondasService, Ronda } from 'src/app/services/rondas/rondas.service';

@Component({
  selector: 'app-lista-rondas',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './lista-rondas.component.html',
  styleUrls: ['./lista-rondas.component.scss'],
})
export class ListaRondasComponent implements OnInit {

  rondas: Ronda[] = [];
  filtradas: Ronda[] = [];
  terminoBusqueda = '';
  filtroFecha = '';

  constructor(private rondasService: RondasService) {}

  ngOnInit() {
    this.cargarRondas();
  }

  cargarRondas() {
    this.rondasService.getRondas().subscribe({
      next: (data) => {
        this.rondas = data;
        this.filtradas = [...data];
      },
      error: () => {}
    });
  }

  filtrar() {
    const term = this.terminoBusqueda.toLowerCase().trim();

    this.filtradas = this.rondas.filter((r) => {
      const coincideObs = r.observacion_ronda?.toLowerCase().includes(term);
      const coincideGuardia = r.turno?.guardia?.nombre?.toLowerCase().includes(term);

      const coincideFecha = this.filtroFecha
        ? r.fecha_hora_inicio?.startsWith(this.filtroFecha)
        : true;

      return (coincideObs || coincideGuardia) && coincideFecha;
    });
  }

  limpiarFiltros() {
    this.terminoBusqueda = '';
    this.filtroFecha = '';
    this.filtradas = [...this.rondas];
  }
}
