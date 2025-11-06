import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TurnosService, Turno } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-lista-turnos',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './lista-turnos.component.html',
  styleUrls: ['./lista-turnos.component.scss'],
})
export class ListaTurnosComponent implements OnInit {
  turnos: Turno[] = [];
  filtrados: Turno[] = [];
  paginados: Turno[] = [];
  terminoBusqueda = '';
  filtroFecha = '';
  currentPage = 1;
  pageSize = 10;

  constructor(private turnosService: TurnosService) {}

  ngOnInit() {
    this.cargarTurnos();
  }

  cargarTurnos() {
    this.turnosService.getTurnos().subscribe({
      next: (data) => {
        this.turnos = data;
        this.filtrados = [...data];
        this.actualizarPaginacion();
      },
      error: (err) => console.error('Error al cargar turnos:', err),
    });
  }

  filtrar() {
    const term = this.terminoBusqueda.toLowerCase().trim();
    this.filtrados = this.turnos.filter((t) => {
      const coincideObs = t.observacion_inicio?.toLowerCase().includes(term);
      const coincideGuardia = t.guardia?.nombre?.toLowerCase().includes(term);
      const coincideFecha = this.filtroFecha
        ? t.fecha_hora_inicio?.startsWith(this.filtroFecha)
        : true;
      return (coincideObs || coincideGuardia) && coincideFecha;
    });
    this.actualizarPaginacion();
  }

  limpiarFiltros() {
    this.terminoBusqueda = '';
    this.filtroFecha = '';
    this.filtrados = [...this.turnos];
    this.actualizarPaginacion();
  }

  actualizarPaginacion() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginados = this.filtrados.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.actualizarPaginacion();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.actualizarPaginacion();
    }
  }

  get totalPages() {
    return Math.ceil(this.filtrados.length / this.pageSize);
  }
}
