import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-observaciones-rondas',
  templateUrl: './observaciones-rondas.page.html',
  styleUrls: ['./observaciones-rondas.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ObservacionesRondasPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
