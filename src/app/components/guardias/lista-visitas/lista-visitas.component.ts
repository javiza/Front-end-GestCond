import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegistroVisitasService } from 'src/app/services/registro-visitas/registro-visitas.service';

@Component({
  selector: 'app-lista-visitas',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './lista-visitas.component.html',
  styleUrls: ['./lista-visitas.component.scss'],
})
export class ListaVisitasComponent implements OnInit {
  visitas: any[] = [];
  visitasFiltradas: any[] = [];
  paginatedVisitas: any[] = [];
  cargando = true;

  terminoBusqueda = '';
  filtroFecha: string = '';

  pageSize = 20;
  currentPage = 1;

  constructor(private registroService: RegistroVisitasService) {}

  ngOnInit() {
    this.cargarVisitas();
  }

cargarVisitas() {
  this.registroService.obtenerRegistros().subscribe({
    next: (res) => {
      console.log('Registros cargados desde backend:', res);

      res.forEach((v: any) => {
        console.log(
          `→ ID ${v.id}: fechaHoraIngreso = ${v.fechaHoraIngreso}, Local = ${new Date(v.fechaHoraIngreso).toLocaleString()}`
        );
      });

      this.visitas = res;
      this.visitasFiltradas = res;
      this.actualizarPaginacion();
    },
    error: (err) => console.error(' Error al obtener visitas:', err),
    complete: () => (this.cargando = false),
  });
}

  /**  Filtra por nombre, patente o fecha */
 filtrarVisitas() {
  let filtradas = this.visitas;

  //  Filtro por texto
  if (this.terminoBusqueda.trim() !== '') {
    const term = this.terminoBusqueda.toLowerCase();
    filtradas = filtradas.filter(
      (v) =>
        (v.nombre && v.nombre.toLowerCase().includes(term)) ||
        (v.patente && v.patente.toLowerCase().includes(term))
    );
  }

  //  Filtro por fecha (ajustando zona horaria local)
  if (this.filtroFecha) {
    const fechaSeleccionada = new Date(this.filtroFecha);

    filtradas = filtradas.filter((v) => {
      const fechaIngresoUTC = new Date(v.fechaHoraIngreso);

      // Corrige la fecha al horario local (Chile)
      const fechaLocal = new Date(
        fechaIngresoUTC.getTime() - fechaIngresoUTC.getTimezoneOffset() * 60000
      );

      // o YYYY-MM-DD en formato local
      const fIngreso = fechaLocal.toISOString().slice(0, 10);
      const fSeleccionada = fechaSeleccionada.toISOString().slice(0, 10);

      return fIngreso === fSeleccionada;
    });
  }

  this.visitasFiltradas = filtradas;
  this.currentPage = 1;
  this.actualizarPaginacion();
}

  limpiarFiltros() {
    this.terminoBusqueda = '';
    this.filtroFecha = '';
    this.visitasFiltradas = [...this.visitas];
    this.actualizarPaginacion();
  }

  /**  Paginación */
  actualizarPaginacion() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedVisitas = this.visitasFiltradas.slice(start, end);
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
    return Math.ceil(this.visitasFiltradas.length / this.pageSize);
  }
}
