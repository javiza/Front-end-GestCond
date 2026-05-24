import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
// import { addCircleOutline } from 'ionicons/icons';
import {
  addCircleOutline,
  chevronDownOutline,
  logOutOutline
} from 'ionicons/icons';
import { Router } from '@angular/router';
import { IngresoUsuarioComponent } from 'src/app/components/administrador/ingreso-usuario/ingreso-usuario.component';
import { IngresoCasasComponent } from 'src/app/components/administrador/ingreso-casas/ingreso-casas.component';
import { IngresoResidentesComponent } from 'src/app/components/administrador/ingreso-residentes/ingreso-residentes.component';
import { IngresoVehiculosComponent } from 'src/app/components/administrador/ingreso-vehiculos/ingreso-vehiculos.component';
import { InfomacionesComponent } from 'src/app/components/administrador/infomaciones/infomaciones.component';
import { NavController } from '@ionic/angular';
import { RegistrarPersonalComponent } from 'src/app/components/administrador/registrar-personal/registrar-personal.component';
import { TrabajosPersonalComponent } from 'src/app/components/administrador/trabajos-personal/trabajos-personal.component';import { RegistroGuardiaComponent } from "src/app/components/administrador/registro-guardia/registro-guardia.component";
import { RegistrarEmpresasComponent } from 'src/app/components/administrador/registrar-empresas/registrar-empresas.component';
import { ListaTurnosComponent } from 'src/app/components/guardias/lista-turnos/lista-turnos.component';
import { ListaVisitasComponent } from 'src/app/components/guardias/lista-visitas/lista-visitas.component';
import { ListaRondasComponent } from 'src/app/components/guardias/lista-rondas/lista-rondas.component';

@Component({
  selector: 'app-gestion-locatarios',
  standalone: true,
  imports: [IonicModule, CommonModule, IngresoUsuarioComponent, 
    RegistrarPersonalComponent, IngresoCasasComponent, IngresoResidentesComponent, 
    IngresoVehiculosComponent, InfomacionesComponent, RegistrarPersonalComponent
    , RegistroGuardiaComponent, RegistrarEmpresasComponent, TrabajosPersonalComponent, 
    ListaTurnosComponent, ListaRondasComponent, ListaVisitasComponent ],
  templateUrl: './gestion-locatarios.page.html',
  styleUrls: ['./gestion-locatarios.page.scss'],
})
export class GestionLocatariosPage {
  @Input() mostrarSoloLista = false;

  openMenu:
  | 'usuarios'
  | 'casas'
  | 'residentes'
  | 'vehiculos'
  | 'informaciones'
  | 'trabajadores'
  | 'registrosIngresos'
  | 'registros'
  | null = null;

openSubMenu:
  | 'personal'
  | 'guardias'
  | 'empresas'
  | 'trabajos'
  | 'observacionesTurno'
  | 'observacionesRondas'
  | 'listaVisitas'
  | null = null;

  seccionActiva: string | null = 'listarInformaciones';

  sidebarOpen = false;
 

  constructor(private router: Router, private navCtrl: NavController) {
    addIcons({
  addCircleOutline,
  chevronDownOutline,
  logOutOutline
});
  }
toggleSubMenu(
  menu:
    | 'personal'
    | 'guardias'
    | 'empresas'
    | 'trabajos'
    | 'observacionesTurno'
    | 'observacionesRondas'
    | 'listaVisitas'
) {
  this.openSubMenu =
    this.openSubMenu === menu
      ? null
      : menu;
}

toggleMenu(
  menu:
    | 'usuarios'
    | 'casas'
    | 'residentes'
    | 'vehiculos'
    | 'informaciones'
    | 'trabajadores'
    | 'registrosIngresos'
    | 'registros'
) {
  this.openMenu =
    this.openMenu === menu
      ? null
      : menu;
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
      if (seccion === 'informaciones') targetId = 'informaciones';
      if (seccion === 'trabajadores') targetId = 'trabajadores';
      if (seccion === 'listarPersonal') targetId = 'tablaPersonal';
      if (seccion === 'listarGuardias') targetId = 'tablaGuardias';
      if (seccion === 'listarEmpresas') targetId = 'tablaEmpresas';
      if (seccion === 'listarTurnos') targetId='tablaTurnos';
      if (seccion === 'listarRondas') targetId='tablaRondas';
      if (seccion === 'listarVisitas') targetId='tablaVisitas';
      
       const target=document.getElementById(targetId);

      if (targetId) {
       
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 500);
  }

 irA(ruta: string) {
  this.navCtrl.navigateForward('/' + ruta); // Transición animada de Ionic
}

  logout() {
    this.router.navigate(['/home']);
  }
}
