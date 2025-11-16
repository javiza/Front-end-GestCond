import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonList,
  IonCol,
  IonRow,
} from '@ionic/angular/standalone';
import {
  UsuariosService,
  Usuario,
  CreateUsuario,
} from 'src/app/services/usuarios/usuarios.service';
import { addIcons } from 'ionicons';
import {
  createOutline,
  trashOutline,
  eyeOutline,
  eyeOffOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-ingreso-usuario',
  templateUrl: './ingreso-usuario.component.html',
  styleUrls: ['./ingreso-usuario.component.scss'],
  standalone: true,
  imports: [
    IonRow,
    IonCol,
    FormsModule,
    CommonModule,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonList,
    DatePipe,
  ],
})
export class IngresoUsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  paginatedUsuarios: Usuario[] = [];
  // Configuración de paginación
  pageSize = 10; // máximo 10 por página
  currentPage = 1;

  // formulario
  id: number | null = null;
  nombre = '';
  rut = '';
  email = '';
  password = '';
  rol: 'administrador' | 'guardia' | 'locatario' = 'guardia';
  showPassword = false;

  constructor(private usuariosService: UsuariosService) {
    addIcons({ createOutline, trashOutline, eyeOutline, eyeOffOutline });
  }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuariosService.findAll().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.actualizarPaginacion();
      },
      error: (err) => console.error('Error al cargar usuarios:', err),
    });
  }

  // Actualiza la lista visible
  actualizarPaginacion() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedUsuarios = this.usuarios.slice(start, end);
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
    return Math.ceil(this.usuarios.length / this.pageSize);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  ingresarUsuario() {
    if (!this.validarRut(this.rut)) {
      alert('RUT inválido. Verifica el formato.');
      return;
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (this.password && !passwordRegex.test(this.password)) {
      alert(
        'La contraseña debe tener:\n' +
          '- Al menos 1 letra mayúscula\n' +
          '- Al menos 1 número\n' +
          '- Minimo 8 caracteres'
      );
      return;
    }
    const payload: CreateUsuario = {
      nombre: this.nombre,
      email: this.email,
      rol: this.rol,
      rut: this.rut.replace(/\./g, ''),
      password: this.password,
    };

    if (this.id) {
      //  Actualizar usuario
      const updatePayload = { ...payload };
      if (!this.password) delete (updatePayload as any).password;

      this.usuariosService.update(this.id, updatePayload).subscribe({
        next: () => {
          this.limpiarFormulario();
          this.cargarUsuarios();
        },
        error: (err) => console.error('Error al actualizar usuario:', err),
      });
    } else {
      //  Crear usuario
      if (!this.password) {
        alert('Debes ingresar una contraseña para el nuevo usuario.');
        return;
      }

      this.usuariosService.create(payload).subscribe({
        next: () => {
          this.limpiarFormulario();
          this.cargarUsuarios();
        },
        error: (err) => console.error('Error al crear usuario:', err),
      });
    }
  }

  cancelarEdicion() {
    if (confirm('¿Deseas cancelar la edición actual?')) {
      this.limpiarFormulario();
    }
  }

  editarUsuario(usuario: Usuario) {
    this.id = usuario.id;
    this.nombre = usuario.nombre;
    this.email = usuario.email;
    this.rol = usuario.rol;
    this.rut = usuario.rut;
    this.password = '';
  }

  eliminarUsuario(usuario: Usuario) {
    if (!confirm(`¿Seguro que deseas eliminar a ${usuario.nombre}?`)) return;
    this.usuariosService.remove(usuario.id).subscribe({
      next: () => this.cargarUsuarios(),
      error: (err) => console.error('Error al eliminar usuario:', err),
    });
  }

  limpiarFormulario() {
    this.id = null;
    this.nombre = '';
    this.rut = '';
    this.email = '';
    this.password = '';
    this.rol = 'guardia';
  }

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
    let cuerpo = limpio.slice(0, -1);
    let dv = limpio.slice(-1);
    cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return cuerpo + '-' + dv;
  }
}
