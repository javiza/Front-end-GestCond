import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { IngresoUsuarioComponent } from 'src/app/components/administrador/ingreso-usuario/ingreso-usuario.component';
import { IngresoCasasComponent } from 'src/app/components/administrador/ingreso-casas/ingreso-casas.component';
import { IngresoResidentesComponent } from 'src/app/components/administrador/ingreso-residentes/ingreso-residentes.component';
import { IngresoVehiculosComponent } from 'src/app/components/administrador/ingreso-vehiculos/ingreso-vehiculos.component';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-gestion-locatarios',
  standalone: true,
  imports: [IonicModule, CommonModule, IngresoUsuarioComponent, IngresoCasasComponent, IngresoResidentesComponent, IngresoVehiculosComponent],
  templateUrl: './gestion-locatarios.page.html',
  styleUrls: ['./gestion-locatarios.page.scss'],
})
export class GestionLocatariosPage {
  @Input() mostrarSoloLista = false;

  openMenu: string | null = null;
  seccionActiva: string | null = null;
  sidebarOpen = false;


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

      if (seccion === 'listarUsuarios') targetId = 'tablaUsuarios';
      if (seccion === 'listarCasas') targetId = 'tablaCasas';
      if (seccion === 'listarResidentes') targetId = 'tablaResidentes';
      if (seccion === 'listarVehiculos') targetId = 'tablaVehiculos';
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
