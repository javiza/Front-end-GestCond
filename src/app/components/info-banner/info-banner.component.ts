import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-info-banner',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './info-banner.component.html',
  styleUrls: ['./info-banner.component.scss'],
})
export class InfoBannerComponent {
  titulo = 'Bienvenido al Condominio Las Flores';
  descripcion = 'Sistema inteligente para la gestión de accesos, visitas y seguridad del condominio.';
  imagen = 'assets/img/condominio.jpeg'; 
}
