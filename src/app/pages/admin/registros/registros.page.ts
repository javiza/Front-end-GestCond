import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ListaRegistroGeneralComponent } from 'src/app/components/administrador/lista-registro-general/lista-registro-general.component';
@Component({
  selector: 'app-registros',
  standalone: true,
  imports: [IonicModule, CommonModule, ListaRegistroGeneralComponent],
  templateUrl: './registros.page.html',
  styleUrls: ['./registros.page.scss'],
})
export class RegistrosPage {
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
