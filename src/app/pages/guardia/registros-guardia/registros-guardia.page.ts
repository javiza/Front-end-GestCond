import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LectorQrComponent } from 'src/app/components/guardias/lector-qr/lector-qr.component';
import { ListaVisitasComponent } from 'src/app/components/guardias/lista-visitas/lista-visitas.component';
import { RegistroVisitasComponent } from 'src/app/components/guardias/registro-visitas/registro-visitas.component';
import { ListaTurnosComponent } from 'src/app/components/guardias/lista-turnos/lista-turnos.component';
import { TurnosGuardiasComponent } from 'src/app/components/guardias/turnos-guardias/turnos-guardias.component';
import { RondasGuardiaComponent } from 'src/app/components/guardias/rondas-guardia/rondas-guardia.component';
import { ListaRondasComponent } from 'src/app/components/guardias/lista-rondas/lista-rondas.component';
@Component({
  selector: 'app-registros-guardia',
  standalone: true,
  imports: [IonicModule, CommonModule, LectorQrComponent, ListaVisitasComponent, RegistroVisitasComponent, ListaTurnosComponent, TurnosGuardiasComponent, RondasGuardiaComponent, ListaRondasComponent],
  templateUrl: './registros-guardia.page.html',
  styleUrls: ['./registros-guardia.page.scss'],
})
export class RegistrosGuardiaPage {
  @Input() mostrarSoloLista = false;

  openMenu: string | null = null;
  seccionActiva: string | null = null;

  constructor(private router: Router, private navCtrl: NavController) {
    addIcons({ addCircleOutline });
  }

  toggleMenu(menu: string) {
    this.openMenu = this.openMenu === menu ? null : menu;
  }

  mostrarSeccion(seccion: string) {
    this.seccionActiva = seccion;

    // Scroll automático según sección
    setTimeout(() => {
      let targetId = '';

      if (seccion === 'listarPersonal') targetId = 'tablaPersonal';
      if (seccion === 'listarEmpresas') targetId = 'tablaEmpresas';
     
      if (targetId) {
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 400);
  }

 irA(ruta: string) {
  this.navCtrl.navigateForward('/' + ruta); // Transición animada de Ionic
}

  logout() {
    this.router.navigate(['/home']);
  }
}
