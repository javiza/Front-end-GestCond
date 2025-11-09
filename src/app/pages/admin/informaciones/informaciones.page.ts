import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-informaciones',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './informaciones.page.html',
  styleUrls: ['./informaciones.page.scss'],
})
export class InformacionesPage {
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

  }

 irA(ruta: string) {
  this.navCtrl.navigateForward('/' + ruta); // Transición animada de Ionic
}

  logout() {
    this.router.navigate(['/home']);
  }
}
