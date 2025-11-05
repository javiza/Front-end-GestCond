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
import { VehiculosService, Vehiculo, CreateVehiculoDto } from 'src/app/services/vehiculos.service';

@Component({
  selector: 'app-ingreso-vehiculos',
  templateUrl: './ingreso-vehiculos.component.html',
  styleUrls: ['./ingreso-vehiculos.component.scss'],
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
export class IngresoVehiculosComponent implements OnInit {
  vehiculos: Vehiculo[] = [];
  paginatedVehiculos: Vehiculo[] = [];
  casas: Casa[] = [];

  // paginación
  pageSize = 10;
  currentPage = 1;

  // formulario
  id: number | null = null;
  nombre_dueno = '';
  patente = '';
  marca = '';
  modelo = '';
  color = '';
  tipo_vehiculo = '';
  id_casa: number | null = null;
  direccionCasaSeleccionada = '';

  constructor(
    private vehiculosService: VehiculosService,
    private casasService: CasasService,
    private toast: ToastController
  ) {
    addIcons({ homeOutline, locationOutline, createOutline, trashOutline });
  }

  ngOnInit() {
    this.cargarVehiculos();
    this.cargarCasas();
  }

  cargarCasas() {
    this.casasService.findAll().subscribe({
      next: (data) => (this.casas = data),
      error: (err) => console.error('Error al cargar casas:', err),
    });
  }

  cargarVehiculos() {
    this.vehiculosService.findAll().subscribe({
      next: (data) => {
        this.vehiculos = data;
        this.actualizarPaginacion();
      },
      error: (err) => console.error('Error al cargar vehículos:', err),
    });
  }

  actualizarPaginacion() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedVehiculos = this.vehiculos.slice(start, end);
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
    return Math.ceil(this.vehiculos.length / this.pageSize);
  }

  onCasaChange(event: any) {
    const id = event.detail.value;
    this.id_casa = id;
    const casa = this.casas.find((c) => c.id === id);
    this.direccionCasaSeleccionada = casa ? casa.direccion : '';
  }

  // REGISTRO DE VEHÍCULO
  async ingresarVehiculo() {
    if (!this.id_casa) {
      await this.presentToast('Selecciona una casa antes de registrar el vehículo.');
      return;
    }

    if (
      !this.nombre_dueno ||
      !this.patente ||
      !this.marca ||
      !this.modelo ||
      !this.color ||
      !this.tipo_vehiculo
    ) {
      await this.presentToast('Completa todos los campos requeridos.');
      return;
    }

    // Crear payload con claves esperadas por el backend
    const payload: any = {
      nombre_dueño: this.nombre_dueno.trim(), // ← se envía con ñ al backend
      patente: this.patente.trim(),
      marca: this.marca.trim(),
      modelo: this.modelo.trim(),
      color: this.color.trim(),
      tipo_vehiculo: this.tipo_vehiculo.trim(),
      id_casa: this.id_casa!,
    };

    if (this.id) {
      // Modo edición
      this.vehiculosService.update(this.id, payload).subscribe({
        next: async () => {
          await this.presentToast('Vehículo actualizado correctamente.');
          this.limpiarFormulario();
          this.cargarVehiculos();
        },
        error: async (err) => {
          console.error('Error al actualizar vehículo:', err);
          await this.presentToast('No se pudo actualizar el vehículo.');
        },
      });
    } else {
      //  Modo creación
      this.vehiculosService.create(payload).subscribe({
        next: async () => {
          await this.presentToast('Vehículo registrado correctamente.');
          this.limpiarFormulario();
          this.cargarVehiculos();
        },
        error: async (err) => {
          console.error('Error al crear vehículo:', err);
          if (err.status === 409) {
            await this.presentToast('La patente ya está registrada.');
          } else {
            await this.presentToast('Error al registrar vehículo.');
          }
        },
      });
    }
  }

  editarVehiculo(vehiculo: Vehiculo) {
    this.id = vehiculo.id;
    this.nombre_dueno = vehiculo.nombre_dueno || ''; // cuidado con ñ aquí también
    this.patente = vehiculo.patente;
    this.marca = vehiculo.marca;
    this.modelo = vehiculo.modelo;
    this.color = vehiculo.color;
    this.tipo_vehiculo = vehiculo.tipo_vehiculo;
    this.id_casa = vehiculo.casa?.id || null;
    this.direccionCasaSeleccionada = vehiculo.casa?.direccion || '';
  }

  eliminarVehiculo(vehiculo: Vehiculo) {
    if (!confirm(`¿Seguro que deseas eliminar el vehículo ${vehiculo.patente}?`)) return;
    this.vehiculosService.remove(vehiculo.id).subscribe({
      next: async () => {
        await this.presentToast('Vehículo eliminado.');
        this.cargarVehiculos();
      },
      error: async () => {
        await this.presentToast('Error al eliminar vehículo.');
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
    this.nombre_dueno = '';
    this.patente = '';
    this.marca = '';
    this.modelo = '';
    this.color = '';
    this.tipo_vehiculo = '';
    this.id_casa = null;
    this.direccionCasaSeleccionada = '';
  }

  // TOAST
  private async presentToast(msg: string) {
    const t = await this.toast.create({ message: msg, duration: 2500, position: 'bottom' });
    await t.present();
  }
}
