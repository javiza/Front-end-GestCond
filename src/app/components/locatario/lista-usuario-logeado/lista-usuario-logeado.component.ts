import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AutorizacionQrService, AutorizacionQR } from 'src/app/services/autorizacion-qr.service';

@Component({
  selector: 'app-lista-usuario-logeado',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './lista-usuario-logeado.component.html',
  styleUrls: ['./lista-usuario-logeado.component.scss'],
})
export class ListaUsuarioLogeadoComponent implements OnInit {
  autorizaciones: AutorizacionQR[] = [];
  filtradas: AutorizacionQR[] = [];
  paginadas: AutorizacionQR[] = [];
  cargando = true;

  terminoBusqueda = '';
  filtroFecha = '';
  currentPage = 1;
  pageSize = 10;

  constructor(private autorizacionService: AutorizacionQrService) {}

  ngOnInit() {
    this.cargarAutorizaciones();
  }

  /** Carga las autorizaciones del usuario autenticado */
  cargarAutorizaciones() {
    this.cargando = true;
    this.autorizacionService.getMine().subscribe({
      next: (data) => {
        this.autorizaciones = data;
        this.filtradas = [...data];
        this.actualizarPaginacion();
        this.cargando = false;
      },
      error: (err) => {
        console.error(' Error al cargar autorizaciones:', err);
        this.cargando = false;
      },
    });
  }

  /**  Filtro por texto y fecha */
  filtrar() {
    const term = this.terminoBusqueda.toLowerCase().trim();
    this.filtradas = this.autorizaciones.filter((a) => {
      const coincideNombre = a.nombre_visita?.toLowerCase().includes(term);
      const coincideMotivo = a.motivo?.toLowerCase().includes(term);
      const coincideFecha = this.filtroFecha
        ? a.fecha_hora?.startsWith(this.filtroFecha)
        : true;
      return (coincideNombre || coincideMotivo) && coincideFecha;
    });
    this.actualizarPaginacion();
  }

  /** Limpia los filtros */
  limpiarFiltros() {
    this.terminoBusqueda = '';
    this.filtroFecha = '';
    this.filtradas = [...this.autorizaciones];
    this.actualizarPaginacion();
  }

  /**  Paginación */
  actualizarPaginacion() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginadas = this.filtradas.slice(start, end);
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
    return Math.ceil(this.filtradas.length / this.pageSize);
  }
}
