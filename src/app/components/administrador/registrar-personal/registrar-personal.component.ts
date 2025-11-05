import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
    IonSelect,
  IonSelectOption,
  IonToggle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonList,
  ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline } from 'ionicons/icons';
import {
  Personal,
  PersonalService,
  CreatePersonalDto,
} from 'src/app/services/personal.service';
import { EmpresasContratistasService, EmpresaContratista } from 'src/app/services/empresa-contratista/empresas-contratistas.service';


@Component({
  selector: 'app-registrar-personal',
  templateUrl: './registrar-personal.component.html',
  styleUrls: ['./registrar-personal.component.scss'],
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
    IonToggle,
],
})
export class RegistrarPersonalComponent implements OnInit {
  personalList: Personal[] = [];
  paginatedPersonal: Personal[] = [];
  empresas: EmpresaContratista[] = [];

  // Paginación
  pageSize = 3;
  currentPage = 1;

  // Formulario
  id: number | null = null;
  nombre = '';
  rut = '';
  cargo = '';
  id_empresa_contratista: number | null = null;
  activo = true;

  constructor(
    private personalService: PersonalService,
    private empresasService: EmpresasContratistasService,
    private toast: ToastController
  ) {
    addIcons({ createOutline, trashOutline });
  }

  ngOnInit() {
    this.cargarPersonal();
    this.cargarEmpresas();
  }

  cargarEmpresas() {
    this.empresasService.findAll().subscribe({
      next: (data) => (this.empresas = data),
      error: (err) => console.error('Error al cargar empresas:', err),
    });
  }

  cargarPersonal() {
    this.personalService.findAll().subscribe({
      next: (data) => {
        this.personalList = data;
        this.actualizarPaginacion();
      },
      error: (err) => console.error('Error al cargar personal:', err),
    });
  }

  actualizarPaginacion() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedPersonal = this.personalList.slice(start, end);
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
    return Math.ceil(this.personalList.length / this.pageSize);
  }

  // Validar formato RUT
  validarRut(rut: string): boolean {
    if (!rut) return false;
    const rutLimpio = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();
    const cuerpo = rutLimpio.slice(0, -1);
    let dv = rutLimpio.slice(-1);
    if (!/^\d+$/.test(cuerpo)) return false;

    let suma = 0;
    let multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo.charAt(i), 10) * multiplo;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    const dvEsperado = 11 - (suma % 11);
    const dvFinal =
      dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

    return dv === dvFinal;
  }

  onRutInput(event: any) {
    const value = (event.target as HTMLInputElement).value ?? '';
    this.rut = this.formatearRut(value.toString());
  }

  formatearRut(rut: string): string {
    if (!rut) return '';
    let limpio = rut.replace(/[^0-9kK]/g, '').toUpperCase();
    if (limpio.length <= 1) return limpio;

    let cuerpo = limpio.slice(0, -1);
    let dv = limpio.slice(-1);
    cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return cuerpo + '-' + dv;
  }

  async ingresarPersonal() {
    if (!this.nombre || !this.rut || !this.cargo) {
      await this.presentToast('Completa todos los campos obligatorios.');
      return;
    }

    if (!this.validarRut(this.rut)) {
      await this.presentToast('El RUT ingresado no es válido.');
      return;
    }

    const payload: CreatePersonalDto = {
      nombre: this.nombre.trim(),
      rut: this.rut.trim(),
      cargo: this.cargo.trim(),
      id_empresa_contratista: this.id_empresa_contratista ?? undefined,
      activo: this.activo,
    };

    if (this.id) {
      this.personalService.update(this.id, payload).subscribe({
        next: async () => {
          await this.presentToast('Personal actualizado correctamente.');
          this.limpiarFormulario();
          this.cargarPersonal();
        },
        error: async (err) => {
          console.error('Error al actualizar personal:', err);
          await this.presentToast('No se pudo actualizar el registro.');
        },
      });
    } else {
      this.personalService.create(payload).subscribe({
        next: async () => {
          await this.presentToast('Personal registrado correctamente.');
          this.limpiarFormulario();
          this.cargarPersonal();
        },
        error: async (err) => {
          console.error('Error al crear personal:', err);
          if (err.status === 409) {
            await this.presentToast('El RUT ya está registrado.');
          } else {
            await this.presentToast('Error al registrar el personal.');
          }
        },
      });
    }
  }

  editarPersonal(p: Personal) {
    this.id = p.id;
    this.nombre = p.nombre;
    this.rut = p.rut;
    this.cargo = p.cargo;
    this.id_empresa_contratista = p.empresa_contratista?.id ?? null;

    this.activo = p.activo;
  }

  eliminarPersonal(p: Personal) {
    if (!confirm(`¿Seguro que deseas eliminar a ${p.nombre}?`)) return;
    this.personalService.remove(p.id).subscribe({
      next: async () => {
        await this.presentToast('Registro eliminado.');
        this.cargarPersonal();
      },
      error: async () => {
        await this.presentToast('Error al eliminar registro.');
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
    this.nombre = '';
    this.rut = '';
    this.cargo = '';
    this.id_empresa_contratista = null;
    this.activo = true;
  }

  private async presentToast(msg: string) {
    const t = await this.toast.create({ message: msg, duration: 2500, position: 'bottom' });
    await t.present();
  }
}
