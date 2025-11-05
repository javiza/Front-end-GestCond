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
  ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline } from 'ionicons/icons';
import {
  EmpresasContratistasService,
  EmpresaContratista,
  CreateEmpresaContratista,
} from 'src/app/services/empresa-contratista/empresas-contratistas.service';

@Component({
  selector: 'app-registrar-empresas',
  templateUrl: './registrar-empresas.component.html',
  styleUrls: ['./registrar-empresas.component.scss'],
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
export class RegistrarEmpresasComponent implements OnInit {
  empresas: EmpresaContratista[] = [];
  paginatedEmpresas: EmpresaContratista[] = [];

  // Paginación
  pageSize = 10;
  currentPage = 1;

  // Formulario
  id: number | null = null;
  nombre_encargado = '';
  nombre_empresa = '';
  rut = '';
  rubro = '';
  telefono = '';
  email = '';

  constructor(
    private empresasService: EmpresasContratistasService,
    private toast: ToastController
  ) {
    addIcons({ createOutline, trashOutline });
  }

  ngOnInit() {
    this.cargarEmpresas();
  }

  cargarEmpresas() {
    this.empresasService.findAll().subscribe({
      next: (data) => {
        this.empresas = data;
        this.actualizarPaginacion();
      },
      error: (err) => console.error('Error al cargar empresas:', err),
    });
  }

  actualizarPaginacion() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedEmpresas = this.empresas.slice(start, end);
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
    return Math.ceil(this.empresas.length / this.pageSize);
  }

  // Validar formato y dígito verificador del RUT
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

  //  Formatear RUT automáticamente mientras se escribe
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

  //  Crear o actualizar empresa
  async ingresarEmpresa() {
    if (this.rut && !this.validarRut(this.rut)) {
      await this.presentToast('El RUT ingresado no es válido.');
      return;
    }

    const payload: CreateEmpresaContratista = {
      nombre_encargado: this.nombre_encargado.trim(),
      nombre_empresa: this.nombre_empresa.trim(),
      rut: this.rut.trim(),
      rubro: this.rubro.trim(),
      telefono: this.telefono.trim(),
      email: this.email.trim(),
    };

    if (this.id) {
      this.empresasService.update(this.id, payload).subscribe({
        next: async () => {
          await this.presentToast('Empresa actualizada correctamente.');
          this.limpiarFormulario();
          this.cargarEmpresas();
        },
        error: async (err) => {
          console.error('Error al actualizar empresa:', err);
          await this.presentToast('No se pudo actualizar la empresa.');
        },
      });
    } else {
      this.empresasService.create(payload).subscribe({
        next: async () => {
          await this.presentToast('Empresa registrada correctamente.');
          this.limpiarFormulario();
          this.cargarEmpresas();
        },
        error: async (err) => {
          console.error('Error al crear empresa:', err);
          if (err.status === 409) {
            await this.presentToast('La empresa o el correo ya están registrados.');
          } else {
            await this.presentToast('Error al registrar la empresa.');
          }
        },
      });
    }
  }

  editarEmpresa(empresa: EmpresaContratista) {
    this.id = empresa.id;
    this.nombre_encargado = empresa.nombre_encargado;
    this.nombre_empresa = empresa.nombre_empresa;
    this.rut = empresa.rut || '';
    this.rubro = empresa.rubro || '';
    this.telefono = empresa.telefono || '';
    this.email = empresa.email || '';
  }

  eliminarEmpresa(empresa: EmpresaContratista) {
    if (!confirm(`¿Seguro que deseas eliminar ${empresa.nombre_empresa}?`)) return;
    this.empresasService.remove(empresa.id).subscribe({
      next: async () => {
        await this.presentToast('Empresa eliminada.');
        this.cargarEmpresas();
      },
      error: async () => {
        await this.presentToast('Error al eliminar empresa.');
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
    this.nombre_encargado = '';
    this.nombre_empresa = '';
    this.rut = '';
    this.rubro = '';
    this.telefono = '';
    this.email = '';
  }

  private async presentToast(msg: string) {
    const t = await this.toast.create({ message: msg, duration: 2500, position: 'bottom' });
    await t.present();
  }
}
