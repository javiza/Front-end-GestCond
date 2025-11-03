import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonList,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline } from 'ionicons/icons';
import { Casa, CasasService, CreateCasaDto } from 'src/app/services/casas/casas.service';

@Component({
  selector: 'app-ingreso-casas',
  templateUrl: './ingreso-casas.component.html',
  styleUrls: ['./ingreso-casas.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
    IonList,
  ],
})
export class IngresoCasasComponent implements OnInit {
  casas: Casa[] = [];
  paginatedCasas: Casa[] = [];

  pageSize = 3;
  currentPage = 1;

  id: number | null = null;
  direccion = '';
  numero = '';

  constructor(private casasService: CasasService) {
    addIcons({ createOutline, trashOutline });
  }

  ngOnInit() {
    this.cargarCasas();
  }

  cargarCasas() {
    this.casasService.findAll().subscribe({
      next: (data) => {
        this.casas = data;
        this.actualizarPaginacion();
      },
      error: (err) => console.error('Error al cargar casas:', err),
    });
  }

  actualizarPaginacion() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedCasas = this.casas.slice(start, end);
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
    return Math.ceil(this.casas.length / this.pageSize);
  }

  ingresarCasa() {
    const payload: CreateCasaDto = {
      direccion: this.direccion,
      numero: this.numero,
    };

    if (this.id) {
      this.casasService.update(this.id, payload).subscribe({
        next: () => {
          this.limpiarFormulario();
          this.cargarCasas();
        },
        error: (err) => console.error('Error al actualizar casa:', err),
      });
    } else {
      this.casasService.create(payload).subscribe({
        next: () => {
          this.limpiarFormulario();
          this.cargarCasas();
        },
        error: (err) => console.error('Error al crear casa:', err),
      });
    }
  }

  editarCasa(casa: Casa) {
    this.id = casa.id;
    this.direccion = casa.direccion;
    this.numero = casa.numero;
  }

  eliminarCasa(casa: Casa) {
    if (!confirm(`¿Seguro que deseas eliminar la casa ${casa.numero}?`)) return;
    this.casasService.remove(casa.id).subscribe({
      next: () => this.cargarCasas(),
      error: (err) => console.error('Error al eliminar casa:', err),
    });
  }

  cancelarEdicion() {
    if (confirm('¿Deseas cancelar la edición actual?')) {
      this.limpiarFormulario();
    }
  }

  limpiarFormulario() {
    this.id = null;
    this.direccion = '';
    this.numero = '';
  }
}
