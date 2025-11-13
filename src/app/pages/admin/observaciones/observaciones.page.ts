import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ListaTurnosComponent } from 'src/app/components/guardias/lista-turnos/lista-turnos.component';
import { ListaRondasComponent } from 'src/app/components/guardias/lista-rondas/lista-rondas.component';
@Component({
  selector: 'app-observaciones',
  standalone: true,
  imports: [IonicModule, CommonModule, ListaTurnosComponent, ListaRondasComponent],
  templateUrl: './observaciones.page.html',
  styleUrls: ['./observaciones.page.scss'],
})
export class ObservacionesPage {
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

  }

 irA(ruta: string) {
  this.navCtrl.navigateForward('/' + ruta); // Transición animada de Ionic
}

  logout() {
    this.router.navigate(['/home']);
  }
}
