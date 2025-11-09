import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AutorizacionQrService, AutorizacionQR } from 'src/app/services/autorizacion-qr/autorizacion-qr.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-lista-autorizados-qr-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './lista-autorizados-qr-usuarios.component.html',
  styleUrls: ['./lista-autorizados-qr-usuarios.component.scss'],
})
export class ListaAutorizadosQrUsuariosComponent implements OnInit {
  autorizaciones: AutorizacionQR[] = [];
  filtradas: AutorizacionQR[] = [];
  paginadas: AutorizacionQR[] = [];
  cargando = true;

  terminoBusqueda = '';
  filtroFecha = '';
  currentPage = 1;
  pageSize = 10;

  constructor(
    private autorizacionService: AutorizacionQrService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cargarAutorizaciones();
  }

  cargarAutorizaciones() {
  const user = this.authService.getUser(); // obtiene el usuario logeado

  if (!user || !user.id) {
    console.error('No se pudo identificar al usuario logeado');
    this.cargando = false;
    return;
  }

  // Usa el ID del usuario autenticado
  const id_usuario = user.id;

  this.autorizacionService.getByUsuario(id_usuario).subscribe({
    next: (data) => {
      this.autorizaciones = data;
      this.filtradas = [...data];
      this.actualizarPaginacion();
      this.cargando = false;
    },
    error: (err) => {
      console.error('Error al cargar autorizaciones:', err);
      this.cargando = false;
    },
  });
}

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

  limpiarFiltros() {
    this.terminoBusqueda = '';
    this.filtroFecha = '';
    this.filtradas = [...this.autorizaciones];
    this.actualizarPaginacion();
  }

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
