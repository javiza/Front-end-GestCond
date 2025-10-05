import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { authInterceptor } from './app/interceptors/auth.interceptor';

// Activar modo producción si corresponde
if (environment.production) {
  enableProdMode();
}

// Registrar web components de Ionic (importante para standalone)
import { defineCustomElements } from '@ionic/pwa-elements/loader';
defineCustomElements(window);

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    
    
    provideHttpClient(
      withInterceptors([
        authInterceptor
      ])
    ),

    provideIonicAngular(),
    provideRouter(routes),
  ],
});
