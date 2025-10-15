import { Component } from '@angular/core';
import { AdminLayoutComponent } from 'src/app/admin-layout/admin-layout.component';
import { IngresoUsuarioComponent } from 'src/app/components/ingreso-usuario/ingreso-usuario.component';
import { EmpresasContratistasComponent } from "src/app/components/empresas-contratistas/empresas-contratistas.component";

@Component({
  selector: 'app-registro-personal',
  standalone: true,
  template: `
    <app-admin-layout title="Registro Personal" activeItem="registro-personal">
      
     
      <div class="form-container">
        <!-- Formulario de Casas -->
        <section class="card">
          <app-ingreso-usuario ></app-ingreso-usuario>
          
        </section>

        <!-- Formulario de Locatarios -->
        <section class="card">
          <app-empresas-contratistas></app-empresas-contratistas>
        </section>
      </div>
    </app-admin-layout>
  `,
  imports: [AdminLayoutComponent, IngresoUsuarioComponent, EmpresasContratistasComponent],
})
export class RegistroPersonalPage {}
