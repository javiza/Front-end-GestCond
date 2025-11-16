import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { RegistroVisitasService } from 'src/app/services/registro-visitas/registro-visitas.service';
import { SocketService } from 'src/app/services/socket.service';

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
  pageSize = 10;
  currentPage = 1;

  constructor(
    private registroService: RegistroVisitasService,
    private toastCtrl: ToastController,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.cargarVisitas();
    this.socketService.onRegistroActualizado((nuevo) => {
    this.visitas.unshift(nuevo);
  });
  }

  cargarVisitas() {
    this.cargando = true;
    this.registroService.obtenerRegistros().subscribe({
      next: (res) => {
        this.visitas = res;
        this.visitasFiltradas = res;
        this.actualizarPaginacion();
      },
      error: (err) => console.error(' Error al obtener visitas:', err),
      complete: () => (this.cargando = false),
    });
  }

  // 🔹 Nuevo método para marcar la salida
  registrarSalida(v: any) {
    if (v.fechaHoraSalida) {
      this.mostrarToast('Esta visita ya tiene registrada la salida.', 'warning');
      return;
    }

    this.registroService.marcarSalida(v.id).subscribe({
      next: (res) => {
        v.fechaHoraSalida = res.fechaHoraSalida;
        this.mostrarToast('Salida registrada correctamente.', 'success');
      },
      error: (err) => {
        console.error(' Error al registrar salida:', err);
        this.mostrarToast('Error al registrar salida.', 'danger');
      },
    });
  }

  async mostrarToast(mensaje: string, color: string = 'primary') {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      color,
      duration: 2000,
      position: 'top',
    });
    await toast.present();
  }

  // =================== FILTROS Y PAGINACIÓN ===================
  filtrarVisitas() {
    let filtradas = this.visitas;
    if (this.terminoBusqueda.trim() !== '') {
      const term = this.terminoBusqueda.toLowerCase();
      filtradas = filtradas.filter(
        (v) =>
          (v.nombre && v.nombre.toLowerCase().includes(term)) ||
          (v.patente && v.patente.toLowerCase().includes(term))
      );
    }
    if (this.filtroFecha) {
      const fechaSeleccionada = new Date(this.filtroFecha);
      filtradas = filtradas.filter((v) => {
        const fechaIngreso = new Date(v.fechaHoraIngreso);
        const ingreso = fechaIngreso.toISOString().slice(0, 10);
        const seleccionada = fechaSeleccionada.toISOString().slice(0, 10);
        return ingreso === seleccionada;
      });
    }
    this.visitasFiltradas = filtradas;
    this.actualizarPaginacion();
  }

  limpiarFiltros() {
    this.terminoBusqueda = '';
    this.filtroFecha = '';
    this.visitasFiltradas = [...this.visitas];
    this.actualizarPaginacion();
  }

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
