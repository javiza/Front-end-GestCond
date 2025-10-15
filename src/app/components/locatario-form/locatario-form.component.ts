import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CasasService, Casa } from '../../services/casas/casas.service';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import {
  LocatariosService,
  Locatario,
} from '../../services/locatarios/locatarios.service';

@Component({
  selector: 'app-locatario-form',
  standalone: true,
  templateUrl: './locatario-form.component.html',
  styleUrls: ['./locatario-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
})
export class LocatarioFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(LocatariosService);
  private toast = inject(ToastController);
showPassword = false;
  form!: FormGroup;
  locatarios: Locatario[] = [];
  editMode = false;
  private casasService = inject(CasasService);
casas: Casa[] = [];
direccionCasaSeleccionada = ''; // para mostrar la dirección

  editingId: number | null = null;

  // Paginación
  pageSize = 2;
  currentPage = 1;
  paginatedLocatarios: Locatario[] = [];
  get totalPages() {
    return Math.ceil(this.locatarios.length / this.pageSize);
  }

ngOnInit() {
  this.form = this.fb.group({
    nombre: ['', Validators.required],
    rut: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    id_casa: [null, [Validators.required, Validators.min(1)]],
  });

  this.cargarCasas();     
  this.cargarLocatarios();
}
onCasaChange(event: any) {
  const idCasa = event.detail.value;
  const casa = this.casas.find(c => c.id === idCasa);
  this.direccionCasaSeleccionada = casa ? casa.direccion : '';
}

cargarCasas() {
  this.casasService.findAll().subscribe({
    next: (data) => (this.casas = data),
    error: (err) => console.error('Error cargando casas:', err),
  });
}


  // Cargar locatarios con paginación
  cargarLocatarios() {
    this.api.findAll().subscribe({
      next: (data) => {
        this.locatarios = data;
        this.updatePagination();
      },
      error: (err) => console.error('Error cargando locatarios:', err),
    });
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedLocatarios = this.locatarios.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  // Envío de formulario
  // ===========================================================
// Envío de formulario con advertencias específicas
// ===========================================================
async submit() {
  const values = this.form.value;
  console.log('VALORES DEL FORMULARIO:', values);
  console.log('ESTADO DEL FORMULARIO:', this.form.status);

  // Verificar campos vacíos
  if (this.form.invalid) {
    // Campo de contraseña corto
    if (this.form.get('password')?.hasError('minlength')) {
      await this.presentToast('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    // Campos requeridos faltantes
    await this.presentToast('Completa todos los campos requeridos.');
    return;
  }

  // Validar formato RUT chileno
  const rutValue = values.rut;
  if (!this.validarRut(rutValue)) {
    await this.presentToast('RUT inválido ingresa uno valido');
    return;
  }

  const payload = {
    ...values,
    rut: rutValue.replace(/\./g, ''), // quitar puntos antes de enviar
  };

  console.log('Payload enviado:', payload);

  this.api.create(payload).subscribe({
    next: async () => {
      await this.presentToast('Locatario registrado correctamente.');
      this.resetForm();
      this.cargarLocatarios();
    },
    error: async (err) => {
      console.error('Error al registrar locatario:', err);
      if (err.status === 409) {
        await this.presentToast('Email o RUT ya existen.');
      } else if (err.status === 400) {
        await this.presentToast('Verifica el ID o la información ingresada.');
      } else {
        await this.presentToast('Error al registrar locatario.');
      }
    },
  });
}

// ===========================================================
// Validar RUT con formato chileno correcto (ej: 12345678-9)
// ===========================================================
validarRut(rut: string): boolean {
  if (!rut) {
    return false;
  }

  const rutLimpio = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();
  if (!/^[0-9]{7,8}[0-9K]$/.test(rutLimpio)) {
    // formato inválido
    return false;
  }

  const cuerpo = rutLimpio.slice(0, -1);
  let dv = rutLimpio.slice(-1);

  // Cálculo del dígito verificador
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

  editar(l: Locatario) {
    this.form.patchValue({
      nombre: l.nombre,
      rut: l.rut,
      email: l.email,
      id_casa: l.casa?.id || null,
    });
    this.form.get('password')?.clearValidators();
    this.form.get('password')?.updateValueAndValidity();
    this.editMode = true;
    this.editingId = l.id;
    this.direccionCasaSeleccionada = l.casa?.direccion || '';

  }

  eliminar(id: number) {
    if (!confirm('¿Seguro que deseas eliminar este locatario?')) {
      return;
    }
    this.api.remove(id).subscribe({
      next: () => {
        this.presentToast('Locatario eliminado');
        this.cargarLocatarios();
      },
      error: () => this.presentToast('Error al eliminar locatario'),
    });
  }

  resetForm() {
    this.form.reset();
    this.editMode = false;
    this.editingId = null;
    this.form.get('password')?.setValidators([Validators.required, Validators.minLength(8)]);
    this.form.get('password')?.updateValueAndValidity();
  }

  // ===========================================================
  // VALIDACIÓN Y FORMATEO DE RUT (idéntica a IngresoUsuarioComponent)
  // ===========================================================
  
  formatearRut(rut: string): string {
    if (!rut) {
      return '';
    }
    let limpio = rut.replace(/[^0-9kK]/g, '').toUpperCase();
    let cuerpo = limpio.slice(0, -1);
    let dv = limpio.slice(-1);
    cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return cuerpo + '-' + dv;
  }

  onRutInput(event: any) {
    const value = (event.target as HTMLInputElement).value ?? '';
    const formateado = this.formatearRut(value.toString());
    this.form.get('rut')?.setValue(formateado, { emitEvent: false });
  }

  // ===========================================================

  private async presentToast(msg: string) {
    const t = await this.toast.create({ message: msg, duration: 2000, position: 'bottom' });
    await t.present();
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
