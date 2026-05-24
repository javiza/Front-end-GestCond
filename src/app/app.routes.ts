import { Routes } from '@angular/router';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [


 
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },

  // Redirección por defecto
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

 
 
  {
    path: 'gestion-locatarios',
    loadComponent: () => import('./pages/admin/gestion-locatarios/gestion-locatarios.page').then( m => m.GestionLocatariosPage),
    canActivate: [RoleGuard],
    data: { roles: ['administrador'] },
  },
  {
    path: 'registros-guardia',
    loadComponent: () => import('./pages/guardia/registros-guardia/registros-guardia.page').then( m => m.RegistrosGuardiaPage),
    canActivate: [RoleGuard],
    data: { roles: ['guardia'] },
  },

  {
    path: 'locatario',
    loadComponent: () => import('./pages/locatario/locatario.page').then( m => m.LocatarioPage),
    canActivate: [RoleGuard],
    data: { roles: ['locatario'] },
  },
  {
    path: 'observaciones',
    loadComponent: () => import('./pages/admin/observaciones/observaciones.page').then( m => m.ObservacionesPage),
    canActivate: [RoleGuard],
    data: { roles: ['administrador'] },
  },
  {
    path: 'registros',
    loadComponent: () => import('./pages/admin/registros/registros.page').then( m => m.RegistrosPage),
    canActivate: [RoleGuard],
    data: { roles: ['administrador'] },
  }
  
 
  
  

  
   
];
