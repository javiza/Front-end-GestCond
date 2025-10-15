import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { AdminLayoutComponent } from 'src/app/admin-layout/admin-layout.component';
import { LocatarioFormComponent } from 'src/app/components/locatario-form/locatario-form.component';
import { CasaFormComponent } from 'src/app/components/casas-form/casas-form.component';

@Component({
  selector: 'app-registros-locatarios',
  standalone: true,
  template: `
    <app-admin-layout
      title="Registros Locatarios"
      activeItem="registros-locatarios"
    >
      <div class="form-container">
        <!-- Formulario de Casas -->
        <section class="card">
          <app-casa-form (casaActualizada)="refrescarLocatarios()"></app-casa-form>
        </section>

        <!-- Formulario de Locatarios -->
        <section class="card">
          <app-locatario-form #locatarios></app-locatario-form>
        </section>
      </div>
    </app-admin-layout>
  `,
  styleUrls: ['./registros-locatarios.page.scss'],
  imports: [
    CommonModule,
    IonicModule,
    AdminLayoutComponent,
    LocatarioFormComponent,
    CasaFormComponent,
  ],
})
export class RegistrosLocatariosPage {
  @ViewChild('locatarios') locatarioForm!: LocatarioFormComponent;
  private toast = inject(ToastController);

  async refrescarLocatarios() {
    this.locatarioForm.cargarLocatarios();

    const t = await this.toast.create({
      message: 'Cambios en casas aplicados — lista de locatarios actualizada.',
      duration: 2000,
      position: 'bottom',
      color: 'primary',
    });
    await t.present();
  }
}
