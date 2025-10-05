import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonSpinner,
  IonIcon,
} from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


import { addIcons } from 'ionicons';
import {
  mailOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
} from 'ionicons/icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonIcon,
    FormsModule,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonText,
    IonSpinner,
  ],
})
export class InicioSesionComponent implements OnInit {
  email = '';
  password = '';
  loading = false;
  errorMessage = '';
  showPassword = false;

  constructor(private authService: AuthService, private router: Router) {
    //íconos para que funcionen en la plantilla
    addIcons({
      mailOutline,
      lockClosedOutline,
      eyeOutline,
      eyeOffOutline,
    });
  }

  ngOnInit() {
    console.log('InicioSesionComponent cargado');
    this.resetForm();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.loading = true;
    this.errorMessage = '';

   this.authService.login(this.email, this.password).subscribe({
  next: (res) => {
    this.authService.saveSession(res);  
    this.loading = false;
    this.resetForm();

    if (res.user.rol === 'administrador') {
      this.router.navigate(['/administrador'], { replaceUrl: true });
    } else if (res.user.rol === 'usuario') {
      this.router.navigate(['/ingresos'], { replaceUrl: true });
    } else {
      this.router.navigate(['/home'], { replaceUrl: true });
    }
  },
      error: (err) => {
        console.error('Error en login:', err);
        this.errorMessage = 'Usuario o contraseña incorrectos';
        this.loading = false;
      },
    });
  }

  public resetForm() {
    this.email = '';
    this.password = '';
    this.errorMessage = '';
  }
}
