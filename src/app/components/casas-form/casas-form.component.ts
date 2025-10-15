import { Casa, CasasService } from '../../services/casas/casas.service';
import { Component, OnInit, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-casa-form',
  standalone: true,
  templateUrl: './casas-form.component.html',
  styleUrls: ['./casas-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
})
export class CasaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(CasasService);
  private toast = inject(ToastController);

  // Evento que notificará al componente padre (RegistrosLocatariosPage)
  @Output() casaActualizada = new EventEmitter<void>();

  form!: FormGroup;
  casas: Casa[] = [];
  editMode = false;
  editingId: number | null = null;

  // 🔹 Paginación
  pageSize = 5;
  currentPage = 1;
  paginatedCasas: Casa[] = [];

  get totalPages() {
    return Math.ceil(this.casas.length / this.pageSize);
  }

  ngOnInit() {
    this.form = this.fb.group({
      numero: ['', Validators.required],
      direccion: ['', Validators.required],
    });
    this.cargarCasas();
  }

  //  Cargar casas
  
  cargarCasas() {
    this.api.findAll().subscribe({
      next: (data) => {
        this.casas = data;
        this.updatePagination();
      },
      error: (err) => console.error('❌ Error cargando casas:', err),
    });
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedCasas = this.casas.slice(startIndex, endIndex);
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

  submit() {
    if (this.form.invalid) {
      this.presentToast('Completa los campos requeridos.');
      return;
    }

    const payload = this.form.value;

    // Si está en modo edición
    if (this.editMode && this.editingId) {
      this.api.update(this.editingId, payload).subscribe({
        next: async () => {
          await this.presentToast('🏠 Casa actualizada correctamente.');
          this.resetForm();
          this.cargarCasas();

          // 🔥 Notificar al padre que se actualizó una casa
          this.casaActualizada.emit();
        },
        error: async (err) => {
          console.error('❌ Error al actualizar casa:', err);
          await this.presentToast('Error al actualizar casa.');
        },
      });
    }
    // Si es una nueva casa
    else {
      this.api.create(payload).subscribe({
        next: async () => {
          await this.presentToast('✅ Casa registrada correctamente.');
          this.resetForm();
          this.cargarCasas();

          // 🔥 Notificar al padre que se creó una nueva casa
          this.casaActualizada.emit();
        },
        error: async (err) => {
          console.error('❌ Error al registrar casa:', err);
          await this.presentToast('Error al registrar casa.');
        },
      });
    }
  }


  // Editar / Eliminar / Reset
 
  editar(c: Casa) {
    this.form.patchValue({
      numero: c.numero,
      direccion: c.direccion,
    });
    this.editMode = true;
    this.editingId = c.id;
  }

  eliminar(id: number) {
    if (!confirm('¿Seguro que deseas eliminar esta casa?')) {
      return;
    }

    this.api.remove(id).subscribe({
      next: async () => {
        await this.presentToast('🗑️ Casa eliminada.');
        this.cargarCasas();
        this.casaActualizada.emit(); // 🔥 también notificar si se elimina
      },
      error: async () => {
        await this.presentToast('Error al eliminar casa.');
      },
    });
  }

  resetForm() {
    this.form.reset();
    this.editMode = false;
    this.editingId = null;
  }


  private async presentToast(msg: string) {
    const t = await this.toast.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
    });
    await t.present();
  }
}
