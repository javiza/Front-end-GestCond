import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { addIcons } from 'ionicons';

import {
  addCircleOutline,
  menuOutline,
  logOutOutline,
  chevronDownOutline
} from 'ionicons/icons';

import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

import { LectorQrComponent } from 'src/app/components/guardias/lector-qr/lector-qr.component';
import { ListaVisitasComponent } from 'src/app/components/guardias/lista-visitas/lista-visitas.component';
import { RegistroVisitasComponent } from 'src/app/components/guardias/registro-visitas/registro-visitas.component';
import { ListaTurnosComponent } from 'src/app/components/guardias/lista-turnos/lista-turnos.component';
import { TurnosGuardiasComponent } from 'src/app/components/guardias/turnos-guardias/turnos-guardias.component';
import { RondasGuardiaComponent } from 'src/app/components/guardias/rondas-guardia/rondas-guardia.component';
import { ListaRondasComponent } from 'src/app/components/guardias/lista-rondas/lista-rondas.component';
import { DeliveryAlertasComponent } from 'src/app/components/guardias/delivery-alertas/delivery-alertas.component';

@Component({
  selector: 'app-registros-guardia',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    LectorQrComponent,
    ListaVisitasComponent,
    RegistroVisitasComponent,
    ListaTurnosComponent,
    TurnosGuardiasComponent,
    RondasGuardiaComponent,
    ListaRondasComponent,
    DeliveryAlertasComponent
  ],
  templateUrl: './registros-guardia.page.html',
  styleUrls: ['./registros-guardia.page.scss'],
})
export class RegistrosGuardiaPage {

  @Input() mostrarSoloLista = false;

  openMenu:
    | 'registrarVisitas'
    | 'registrarTurnos'
    | 'registrarRondas'
    | null = null;

  seccionActiva: string | null = 'registrarVisitas';

  sidebarOpen = false;

  constructor(
    private router: Router,
    private navCtrl: NavController
  ) {
    addIcons({
      addCircleOutline,
      menuOutline,
      logOutOutline,
      chevronDownOutline
    });
  }

  toggleMenu(
    menu:
      | 'registrarVisitas'
      | 'registrarTurnos'
      | 'registrarRondas'
  ) {
    this.openMenu =
      this.openMenu === menu
        ? null
        : menu;
  }

  mostrarSeccion(seccion: string) {
    this.seccionActiva = seccion;

    setTimeout(() => {

      let targetId = '';

      if (seccion === 'listarVisitas') {
        targetId = 'tablaVisitas';
      }

      if (seccion === 'listarTurnos') {
        targetId = 'tablaTurnos';
      }

      if (seccion === 'listarRondas') {
        targetId = 'tablaRondas';
      }

      const target = document.getElementById(targetId);

      if (targetId && target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }

    }, 500);
  }

  irA(ruta: string) {
    this.navCtrl.navigateForward('/' + ruta);
  }

  logout() {
    this.router.navigate(['/home']);
  }
}