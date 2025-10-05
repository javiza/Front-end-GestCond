import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonSegment,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonSegmentButton,
} from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { IngresoUsuarioComponent } from 'src/app/components/ingreso-usuario/ingreso-usuario.component';
@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonButton,
    IonButtons,
    IonSegmentButton,
    IonSegment,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IngresoUsuarioComponent,
    
 
  ],
})
export class AdministradorPage implements OnInit, OnDestroy {
  activeSegment: string = 'home'; // estado del segmento
  private routerSub!: Subscription;

  private navCtrl = inject(NavController);
  private router = inject(Router);

  ngOnInit(): void {
    console.log('AdministradorPage cargado');

    // nicializar activeSegment según la URL actual
    this.setActiveSegment(this.router.url);

    
    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setActiveSegment(event.urlAfterRedirects);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

  //  Método central para determinar el segmento
  private setActiveSegment(url: string) {
   if (url.includes('administrador')) {
             this.activeSegment = 'administrador';
           } else if (url.includes('inventarioadmin')) {
                    this.activeSegment = 'inventarioadmin';
                  } else {
                    this.activeSegment = 'home';
                  }
  }

  // Usamos navigateRoot 
  segmentChanged(event: any) {
    const { value } = event.detail;
    console.log('Segment cambiado a:', value);
    this.navCtrl.navigateRoot('/' + value);
  }

  logout() {
    localStorage.removeItem('token');
    this.navCtrl.navigateRoot('/home');
  }
}
