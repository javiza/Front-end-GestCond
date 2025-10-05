import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFooter,
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { InicioSesionComponent } from '../../components/inicio-sesion/inicio-sesion.component';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { settingsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    InicioSesionComponent,
    IonFooter,
    
    ],
})
export class HomePage {
  constructor() {
    addIcons({
      settingsOutline,
    });
  }
}
