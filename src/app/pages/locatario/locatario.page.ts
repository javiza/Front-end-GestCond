import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { AutorizacionQrComponent } from 'src/app/components/locatario/autorizacion-qr/autorizacion-qr.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-locatario',
  templateUrl: './locatario.page.html',
  styleUrls: ['./locatario.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, AutorizacionQrComponent]
})
export class LocatarioPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
   logout() {
    this.router.navigate(['/home']);
  }

}
