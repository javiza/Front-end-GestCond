import { enableProdMode, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { authInterceptor } from './app/interceptors/auth.interceptor';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { provideServiceWorker } from '@angular/service-worker';
import { setAssetPath } from '@stencil/core';



// Corrige la carga de assets
setAssetPath(document.baseURI || '/');

// Activa producción 
if (environment.production) {
  enableProdMode();
}

// Registra íconos de Ionicons
addIcons({ createOutline, trashOutline, eyeOutline, eyeOffOutline });

// Define los componentes Web de Ionic PWA (como cámara, micrófono, etc.)
defineCustomElements(window);

// Bootstrap principal con configuración optimizada
bootstrapApplication(AppComponent, {
  providers: [
    // Estrategia de rutas de Ionic
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    // HTTP con interceptor JWT
    provideHttpClient(withInterceptors([authInterceptor])),

    // Ionic + Router
    provideIonicAngular(),
    provideRouter(routes),

    // Service Worker (solo uno, limpio)
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
}).catch(err => console.error(err));
