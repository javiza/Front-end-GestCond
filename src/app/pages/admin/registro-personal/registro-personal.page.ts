import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RegistrarEmpresasComponent } from 'src/app/components/administrador/registrar-empresas/registrar-empresas.component';
import { RegistrarPersonalComponent } from 'src/app/components/administrador/registrar-personal/registrar-personal.component';
import { RegistroGuardiaComponent } from 'src/app/components/administrador/registro-guardia/registro-guardia.component';
import { TrabajosPersonalComponent } from 'src/app/components/administrador/trabajos-personal/trabajos-personal.component';

@Component({
  selector: 'app-registro-personal',
  standalone: true,
  imports: [IonicModule, CommonModule, RegistrarEmpresasComponent, RegistrarPersonalComponent, RegistroGuardiaComponent, TrabajosPersonalComponent],
  templateUrl: './registro-personal.page.html',
  styleUrls: ['./registro-personal.page.scss'],
})
export class RegistroPersonalPage {
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

      if (seccion === 'listarPersonal') targetId = 'tablaPersonal';
      if (seccion === 'listarEmpresas') targetId = 'tablaEmpresas';
      if (seccion === 'listarGuardias') targetId = 'tablaGuardias';
      if (seccion === 'listarTrabajos') targetId = 'tablaTrabajos';
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
