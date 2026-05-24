import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonFooter
} from '@ionic/angular/standalone';

import { Router } from '@angular/router';

import { addIcons } from 'ionicons';

import {
  logOutOutline
} from 'ionicons/icons';

import { AutorizacionQrComponent } from 'src/app/components/locatario/autorizacion-qr/autorizacion-qr.component';

@Component({
  selector: 'app-locatario',
  standalone: true,
  templateUrl: './locatario.page.html',
  styleUrls: ['./locatario.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonFooter,
    AutorizacionQrComponent
  ]
})
export class LocatarioPage implements OnInit {

  constructor(
    private router: Router
  ) {

    addIcons({
      logOutOutline
    });

  }

  ngOnInit() {}

  logout() {

    this.router.navigate(['/home']);

  }

}