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


// Activar modo producción si corresponde
if (environment.production) {
  enableProdMode();
}

// Registrar iconos Ionicons
addIcons({
  createOutline,
  trashOutline,
  eyeOutline,
  eyeOffOutline
});

// Registrar componentes PWA (cámara, micrófono, etc.)
defineCustomElements(window);

// Bootstrap principal
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(withInterceptors([authInterceptor])),
    provideIonicAngular(),
    provideRouter(routes),

    // Service Worker
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
}).catch(err => console.error(err));
