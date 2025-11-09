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
  IonSelect,
  IonSelectOption,
  ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline, peopleOutline, calendarOutline } from 'ionicons/icons';
import { TrabajosService, Trabajo, CreateTrabajoDto, UpdateTrabajoDto } from 'src/app/services/trabajos/trabajos.service';
import { PersonalService, Personal } from 'src/app/services/personal/personal.service';
@Component({
  selector: 'app-trabajos-personal',
  templateUrl: './trabajos-personal.component.html',
  styleUrls: ['./trabajos-personal.component.scss'],
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
    IonSelect,
    IonSelectOption,
  ],
})
export class TrabajosPersonalComponent implements OnInit {
  trabajos: Trabajo[] = [];
  paginatedTrabajos: Trabajo[] = [];
  personalInterno: Personal[] = [];

  // paginación
  pageSize = 10;
  currentPage = 1;

  // formulario
  id: number | null = null;
  trabajo_realizado = '';
  fecha_inicio = '';
  fecha_termino = '';
  id_personal_interno: number | null = null;

  constructor(
    private trabajosService: TrabajosService,
    private personalService: PersonalService,
    private toast: ToastController
  ) {
    addIcons({ createOutline, trashOutline, peopleOutline, calendarOutline });
  }

  ngOnInit() {
    this.cargarTrabajos();
    this.cargarPersonal();
  }

  cargarPersonal() {
    this.personalService.findAll().subscribe({
      next: (data) => (this.personalInterno = data),
      error: (err) => console.error('Error al cargar personal interno:', err),
    });
  }

  cargarTrabajos() {
    this.trabajosService.findAll().subscribe({
      next: (data) => {
        this.trabajos = data;
        this.actualizarPaginacion();
      },
      error: (err) => console.error('Error al cargar trabajos:', err),
    });
  }

  actualizarPaginacion() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedTrabajos = this.trabajos.slice(start, end);
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
    return Math.ceil(this.trabajos.length / this.pageSize);
  }

  async ingresarTrabajo() {
    if (!this.trabajo_realizado || !this.id_personal_interno) {
      await this.presentToast('Completa todos los campos obligatorios.');
      return;
    }

    const payload: CreateTrabajoDto = {
      trabajo_realizado: this.trabajo_realizado.trim(),
      fecha_inicio: this.fecha_inicio || undefined,
      fecha_termino: this.fecha_termino || undefined,
      id_personal_interno: this.id_personal_interno,
    };

    if (this.id) {
      this.trabajosService.update(this.id, payload).subscribe({
        next: async () => {
          await this.presentToast('Trabajo actualizado correctamente.');
          this.limpiarFormulario();
          this.cargarTrabajos();
        },
        error: async (err) => {
          console.error('Error al actualizar trabajo:', err);
          await this.presentToast('No se pudo actualizar el trabajo.');
        },
      });
    } else {
      this.trabajosService.create(payload).subscribe({
        next: async () => {
          await this.presentToast('Trabajo registrado correctamente.');
          this.limpiarFormulario();
          this.cargarTrabajos();
        },
        error: async (err) => {
          console.error('Error al crear trabajo:', err);
          await this.presentToast('Error al registrar trabajo.');
        },
      });
    }
  }

  editarTrabajo(trabajo: Trabajo) {
    this.id = trabajo.id;
    this.trabajo_realizado = trabajo.trabajo_realizado;
    this.fecha_inicio = trabajo.fecha_inicio;
    this.fecha_termino = trabajo.fecha_termino || '';
    this.id_personal_interno = trabajo.personal_interno?.id || null;
  }

  eliminarTrabajo(trabajo: Trabajo) {
    if (!confirm(`¿Seguro que deseas eliminar el trabajo "${trabajo.trabajo_realizado}"?`)) return;
    this.trabajosService.remove(trabajo.id).subscribe({
      next: async () => {
        await this.presentToast('Trabajo eliminado.');
        this.cargarTrabajos();
      },
      error: async () => {
        await this.presentToast('Error al eliminar trabajo.');
      },
    });
  }

  cancelarEdicion() {
    if (confirm('¿Deseas cancelar la edición actual?')) {
      this.limpiarFormulario();
    }
  }

  limpiarFormulario() {
    this.id = null;
    this.trabajo_realizado = '';
    this.fecha_inicio = '';
    this.fecha_termino = '';
    this.id_personal_interno = null;
  }

  private async presentToast(msg: string) {
    const t = await this.toast.create({ message: msg, duration: 2500, position: 'bottom' });
    await t.present();
  }
}
