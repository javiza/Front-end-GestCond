import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

import { AnalyticsDashboardComponent } from 'src/app/components/analytics-dashboard/analytics-dashboard.component';

import { addIcons } from 'ionicons';
import {
  menuOutline,
  logOutOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-infomaciones',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    AnalyticsDashboardComponent
  ],
  templateUrl: './infomaciones.component.html',
  styleUrls: ['./infomaciones.component.scss'],
})
export class InfomacionesComponent implements OnInit {

  @Input() mostrarSoloLista = false;

  openMenu: string | null = null;

  seccionActiva: string = 'analytics';

  sidebarOpen = false;

  constructor(
    private router: Router,
    private navCtrl: NavController
  ) {

    addIcons({
      menuOutline,
      logOutOutline
    });

  }

  ngOnInit(): void {}

  toggleMenu(menu: string) {
    this.openMenu = this.openMenu === menu ? null : menu;
  }

  mostrarSeccion(seccion: string) {
    this.seccionActiva = seccion;
  }
}