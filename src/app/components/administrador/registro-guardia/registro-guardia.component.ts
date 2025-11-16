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
  GuardiasService,
  Guardia,
  CreateGuardiaDto,
} from 'src/app/services/guardia/guardia.service';
import {
  EmpresasContratistasService,
  EmpresaContratista,
} from 'src/app/services/empresa-contratista/empresas-contratistas.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-registro-guardia',
  templateUrl: './registro-guardia.component.html', // ✅ HTML separado
  styleUrls: ['./registro-guardia.component.scss'],
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
export class RegistroGuardiaComponent implements OnInit {
  guardiasList: Guardia[] = [];
  paginatedGuardias: Guardia[] = [];
  empresas: EmpresaContratista[] = [];

  pageSize = 10;
  currentPage = 1;

  id: number | null = null;
  nombre = '';
  rut = '';
  telefono = '';
  email = '';
  id_empresa_contratista: number | null = null;
  activo = true;
  id_usuario: number | null = null;
  constructor(
    private guardiasService: GuardiasService,
    private empresasService: EmpresasContratistasService,
    private authService: AuthService,
    private toast: ToastController
  ) {
    addIcons({ createOutline, trashOutline });
  }

  ngOnInit() {
    this.id_usuario = this.authService.getUser()?.id ?? null;
    this.cargarGuardias();
    this.cargarEmpresas();
  }

  cargarEmpresas() {
    this.empresasService.findAll().subscribe({
      next: (data) => (this.empresas = data),
      error: (err) => console.error('Error al cargar empresas:', err),
    });
  }

  cargarGuardias() {
    this.guardiasService.findAll().subscribe({
      next: (data) => {
        this.guardiasList = data;
        this.actualizarPaginacion();
      },
      error: (err) => console.error('Error al cargar guardias:', err),
    });
  }

  actualizarPaginacion() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedGuardias = this.guardiasList.slice(start, end);
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
    return Math.ceil(this.guardiasList.length / this.pageSize);
  }

  validarRut(rut: string): boolean {
    if (!rut) return false;

    // Elimina puntos y guion
    const rutLimpio = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();

    const cuerpo = rutLimpio.slice(0, -1);
    const dv = rutLimpio.slice(-1);

    // Validar que el cuerpo sea numérico
    if (!/^\d+$/.test(cuerpo)) return false;

    let suma = 0;
    let multiplo = 2;

    // Cálculo del dígito verificador
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
  this.rut = this.formatearRut(value);
}

formatearRut(rut: string): string {
  if (!rut) return '';

  // Eliminar todo excepto números y K
  let limpio = rut.replace(/[^0-9kK]/g, '').toUpperCase();

  // Si tiene 1 caracter, no formateamos aún
  if (limpio.length <= 1) return limpio;

  // Separar cuerpo y dígito verificador
  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);

  // Insertar puntos cada 3 dígitos hacia atrás
  const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${cuerpoFormateado}-${dv}`;
}


  async ingresarGuardia() {
    if (!this.nombre || !this.rut) {
      await this.presentToast('Completa todos los campos obligatorios.');
      return;
    }

    if (!this.validarRut(this.rut)) {
      await this.presentToast('El RUT ingresado no es válido.');
      return;
    }

    const payload: CreateGuardiaDto = {
      nombre: this.nombre.trim(),
      rut: this.rut.trim(),
      telefono: this.telefono?.trim(),
      email: this.email?.trim(),
      id_empresa_contratista: this.id_empresa_contratista ?? undefined,
      id_usuario: this.id_usuario ?? undefined,
      activo: this.activo,
    };

    if (this.id) {
      this.guardiasService.update(this.id, payload).subscribe({
        next: async () => {
          await this.presentToast('Guardia actualizado correctamente.');
          this.limpiarFormulario();
          this.cargarGuardias();
        },
        error: async (err) => {
          console.error('Error al actualizar guardia:', err);
          await this.presentToast('No se pudo actualizar el registro.');
        },
      });
    } else {
      this.guardiasService.create(payload).subscribe({
        next: async () => {
          await this.presentToast('Guardia registrado correctamente.');
          this.limpiarFormulario();
          this.cargarGuardias();
        },
        error: async (err) => {
          console.error('Error al crear guardia:', err);
          await this.presentToast('Error al registrar el guardia.');
        },
      });
    }
  }

  editarGuardia(g: Guardia) {
    this.id = g.id;
    this.nombre = g.nombre;
    this.rut = g.rut;
    this.telefono = g.telefono || '';
    this.email = g.email || '';
    this.id_empresa_contratista = g.empresaContratista?.id ?? null;
    this.activo = g.activo;
  }

  eliminarGuardia(g: Guardia) {
    if (!confirm(`¿Seguro que deseas eliminar a ${g.nombre}?`)) return;
    this.guardiasService.remove(g.id).subscribe({
      next: async () => {
        await this.presentToast('Guardia eliminado correctamente.');
        this.cargarGuardias();
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
    this.telefono = '';
    this.email = '';
    this.id_empresa_contratista = null;
    this.activo = true;
  }

  private async presentToast(msg: string) {
    const t = await this.toast.create({
      message: msg,
      duration: 2500,
      position: 'bottom',
    });
    await t.present();
  }
}
