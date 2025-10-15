import { Component, Input, HostListener } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent {
  @Input() title: string = '';
  @Input() activeItem: string = '';

  isMenuOpen: boolean = false;
  isMobile: boolean = window.innerWidth <= 768;

  constructor(private navCtrl: NavController) {}

  navigate(section: string) {
    this.activeItem = section;
    this.navCtrl.navigateRoot(`/${section}`);
    if (this.isMobile) this.isMenuOpen = false; // cerrar al navegar en móvil
  }

  logout() {
    localStorage.removeItem('token');
    this.navCtrl.navigateRoot('/home');
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenuOnMobile() {
    if (this.isMobile) this.isMenuOpen = false;
  }

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth <= 768;
    if (!this.isMobile) this.isMenuOpen = true;
  }
}
