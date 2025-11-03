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
import { createOutline, trashOutline, homeOutline, locationOutline } from 'ionicons/icons';
import { CasasService, Casa } from 'src/app/services/casas/casas.service';
import { ResidentesService, Residente, CreateResidenteDto } from 'src/app/services/residentes.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-ingreso-residentes',
  templateUrl: './ingreso-residentes.component.html',
  styleUrls: ['./ingreso-residentes.component.scss'],
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
export class IngresoResidentesComponent implements OnInit {
  residentes: Residente[] = [];
  paginatedResidentes: Residente[] = [];
  casas: Casa[] = [];

  // paginación
  pageSize = 3;
  currentPage = 1;

  // formulario
  id: number | null = null;
  nombre = '';
  rut = '';
  email = '';
  id_casa: number | null = null;
  direccionCasaSeleccionada = '';

  constructor(
    private residentesService: ResidentesService,
    private casasService: CasasService,
    private authService: AuthService,
    private toast: ToastController
  ) {
    addIcons({homeOutline,locationOutline,createOutline,trashOutline});
  }

  ngOnInit() {
    this.cargarResidentes();
    this.cargarCasas();
  }

  cargarCasas() {
    this.casasService.findAll().subscribe({
      next: (data) => (this.casas = data),
      error: (err) => console.error('Error al cargar casas:', err),
    });
  }

  cargarResidentes() {
    this.residentesService.findAll().subscribe({
      next: (data) => {
        this.residentes = data;
        this.actualizarPaginacion();
      },
      error: (err) => console.error('Error al cargar residentes:', err),
    });
  }

  actualizarPaginacion() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedResidentes = this.residentes.slice(start, end);
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
    return Math.ceil(this.residentes.length / this.pageSize);
  }

  onCasaChange(event: any) {
    const id = event.detail.value;
    this.id_casa = id;
    const casa = this.casas.find((c) => c.id === id);
    this.direccionCasaSeleccionada = casa ? casa.direccion : '';
  }

  
  // VALIDACIÓN Y FORMATEO DE RUT 

  validarRut(rut: string): boolean {
    if (!rut) return false;

    const rutLimpio = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();
    if (!/^[0-9]{7,8}[0-9K]$/.test(rutLimpio)) return false;

    const cuerpo = rutLimpio.slice(0, -1);
    let dv = rutLimpio.slice(-1);

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

  formatearRut(rut: string): string {
    if (!rut) return '';
    let limpio = rut.replace(/[^0-9kK]/g, '').toUpperCase();
    let cuerpo = limpio.slice(0, -1);
    let dv = limpio.slice(-1);
    cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return cuerpo + '-' + dv;
  }

  onRutInput(event: any) {
    const value = (event.target as HTMLInputElement).value ?? '';
    const formateado = this.formatearRut(value.toString());
    this.rut = formateado;
  }

  
  // REGISTRO DE RESIDENTE
 

  async ingresarResidente() {
  const id_usuario = this.authService.getUserId();

  if (!id_usuario) {
    await this.presentToast('Error: no hay usuario autenticado. Inicia sesión nuevamente.');
    return;
  }

  if (!this.id_casa) {
    await this.presentToast('Selecciona una casa antes de registrar al residente.');
    return;
  }

  if (!this.nombre || !this.rut || !this.email) {
    await this.presentToast('Completa todos los campos requeridos.');
    return;
  }

  if (!this.validarRut(this.rut)) {
    await this.presentToast('RUT inválido, ingresa uno válido (Ej: 12345678-9).');
    return;
  }

  const rutLimpio = this.rut.replace(/\./g, '').trim();

  const payload: CreateResidenteDto = {
    nombre: this.nombre.trim(),
    rut: rutLimpio,
    email: this.email.trim(),
    id_casa: this.id_casa,
    id_usuario,
    activo: true,
  };

  if (this.id) {
    //  Modo edición
    this.residentesService.update(this.id, payload).subscribe({
      next: async () => {
        await this.presentToast('Residente actualizado correctamente.');
        this.limpiarFormulario();
        this.cargarResidentes();
      },
      error: async (err) => {
        console.error('Error al actualizar residente:', err);
        await this.presentToast('No se pudo actualizar el residente.');
      },
    });
  } else {
    //  Modo creación
    this.residentesService.create(payload).subscribe({
      next: async () => {
        await this.presentToast('Residente registrado correctamente.');
        this.limpiarFormulario();
        this.cargarResidentes();
      },
      error: async (err) => {
        console.error('Error al crear residente:', err);
        if (err.status === 409) {
          await this.presentToast('El RUT o correo ya están registrados.');
        } else {
          await this.presentToast('Error al registrar residente.');
        }
      },
    });
  }
}


  editarResidente(residente: Residente) {
    this.id = residente.id;
    this.nombre = residente.nombre;
    this.rut = residente.rut;
    this.email = residente.email;
    this.id_casa = residente.casa?.id || null;
    this.direccionCasaSeleccionada = residente.casa?.direccion || '';
  }

  eliminarResidente(residente: Residente) {
    if (!confirm(`¿Seguro que deseas eliminar al residente ${residente.nombre}?`)) return;
    this.residentesService.remove(residente.id).subscribe({
      next: async () => {
        await this.presentToast('Residente eliminado.');
        this.cargarResidentes();
      },
      error: async () => {
        await this.presentToast('Error al eliminar residente.');
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
    this.email = '';
    this.id_casa = null;
    this.direccionCasaSeleccionada = '';
  }

  // TOAST
  
  private async presentToast(msg: string) {
    const t = await this.toast.create({ message: msg, duration: 2500, position: 'bottom' });
    await t.present();
  }
}
