import { Component } from '@angular/core';
import { AdminLayoutComponent } from 'src/app/admin-layout/admin-layout.component';
// import { InformacionesComponent } from 'src/app/components/informaciones/informaciones.component';

@Component({
  selector: 'app-informaciones',
  standalone: true,
  template: `
    <app-admin-layout title="Informaciones" activeItem="informaciones">
      <!-- <app-informaciones></app-informaciones> -->
    </app-admin-layout>
  `,
  imports: [AdminLayoutComponent],
})
export class InformacionesPage {}
