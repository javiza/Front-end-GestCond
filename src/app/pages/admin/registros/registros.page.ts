import { Component } from '@angular/core';
import { AdminLayoutComponent } from 'src/app/admin-layout/admin-layout.component';
// import { RegistrosComponent } from 'src/app/components/registros/registros.component';

@Component({
  selector: 'app-registros',
  standalone: true,
  template: `
    <app-admin-layout title="Registros Generales" activeItem="registros">
      <!-- <app-registros></app-registros> -->
    </app-admin-layout>
  `,
  imports: [AdminLayoutComponent],
})
export class RegistrosPage {}
