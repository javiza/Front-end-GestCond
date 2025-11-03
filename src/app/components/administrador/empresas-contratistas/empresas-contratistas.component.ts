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
import { EmpresasContratistasService, EmpresaContratista, CreateEmpresaContratista } from 'src/app/services/empresa-contratista/empresas-contratistas.service';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-empresas-contratistas',
  templateUrl: './empresas-contratistas.component.html',
  styleUrls: ['./empresas-contratistas.component.scss'],
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
export class EmpresasContratistasComponent implements OnInit {
  empresas: EmpresaContratista[] = [];
  paginatedEmpresas: EmpresaContratista[] = [];
  pageSize = 3;
  currentPage = 1;

  // formulario
  id: number | null = null;
  nombre_encargado = '';
  nombre_empresa = '';
  rut = '';
  rubro = '';
  telefono = '';
  email = '';

  constructor(private service: EmpresasContratistasService) {
    addIcons({ createOutline, trashOutline });
  }

  ngOnInit() {
    this.cargarEmpresas();
  }

  cargarEmpresas() {
    this.service.findAll().subscribe({
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

  get totalPages() {
    return Math.ceil(this.empresas.length / this.pageSize);
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

  registrarEmpresa() {
    const payload: CreateEmpresaContratista = {
      nombre_encargado: this.nombre_encargado,
      nombre_empresa: this.nombre_empresa,
      rut: this.rut,
      rubro: this.rubro,
      telefono: this.telefono,
      email: this.email,
    };

    if (this.id) {
      this.service.update(this.id, payload).subscribe({
        next: () => {
          this.limpiarFormulario();
          this.cargarEmpresas();
        },
        error: (err) => console.error('Error al actualizar empresa:', err),
      });
    } else {
      this.service.create(payload).subscribe({
        next: () => {
          this.limpiarFormulario();
          this.cargarEmpresas();
        },
        error: (err) => console.error('Error al crear empresa:', err),
      });
    }
  }

  editarEmpresa(e: EmpresaContratista) {
    this.id = e.id;
    this.nombre_encargado = e.nombre_encargado;
    this.nombre_empresa = e.nombre_empresa;
    this.rubro = e.rubro;
    this.telefono = e.telefono;
    this.email = e.email;
  }

  eliminarEmpresa(e: EmpresaContratista) {
    if (!confirm(`¿Seguro que deseas eliminar la empresa ${e.nombre_empresa}?`)) {
      return;
    }
    this.service.remove(e.id).subscribe({
      next: () => this.cargarEmpresas(),
      error: (err) => console.error('Error al eliminar empresa:', err),
    });
  }

  cancelarEdicion() {
    this.limpiarFormulario();
  }

  limpiarFormulario() {
    this.id = null;
    this.nombre_encargado = '';
    this.nombre_empresa = '';
    this.rubro = '';
    this.telefono = '';
    this.email = '';
  }
}
