import { Component } from '@angular/core';
import { AdminLayoutComponent } from 'src/app/admin-layout/admin-layout.component';
// import { ObservacionesComponent } from 'src/app/components/observaciones/observaciones.component';

@Component({
  selector: 'app-observaciones',
  standalone: true,
  template: `
    <app-admin-layout title="Observaciones" activeItem="observaciones">
      <!-- <app-observaciones></app-observaciones> -->
    </app-admin-layout>
  `,
  imports: [AdminLayoutComponent],
})
export class ObservacionesPage {}
