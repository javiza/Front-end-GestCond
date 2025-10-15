// src/app/pages/locatarios/locatario-detail.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { LocatariosService } from 'src/app/services/locatarios/locatarios.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-locatario-detail',
  standalone: true,
  templateUrl: './locatario-detail.component.html',
  styleUrls: ['./locatario-detail.component.scss'],
  imports: [CommonModule, IonicModule, HttpClientModule],
})
export class LocatarioDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(LocatariosService);
  private toast = inject(ToastController);
  private nav = inject(NavController);

  locatario: any = null;
  loading = true;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      this.presentToast('ID inválido');
      this.nav.back();
      return;
    }
    this.cargarDetalle(id);
  }

  cargarDetalle(id: number) {
    this.api.getDetail(id).subscribe({
      next: (data) => {
        this.locatario = data;
        this.loading = false;
      },
      error: (e) => {
        console.error(e);
        this.presentToast('Error al cargar detalles');
        this.nav.back();
      },
    });
  }

  async presentToast(message: string) {
    const t = await this.toast.create({ message, duration: 2000, position: 'bottom' });
    await t.present();
  }

  volver() {
    this.nav.back();
  }
}
