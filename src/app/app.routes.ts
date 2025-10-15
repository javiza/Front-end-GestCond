import { Routes } from '@angular/router';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [

  // Página de usuario normal
  // {
  //   path: 'ingresos',
  //   loadComponent: () =>
  //     import('./pages/ingresos/ingresos.page').then((m) => m.IngresosPage),
  //   canActivate: [RoleGuard],
  //   data: { roles: ['usuario'] },
  // },

  // 



 
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
    path: 'registros-locatarios',
    loadComponent: () => import('./pages/admin/registros-locatarios/registros-locatarios.page').then( m => m.RegistrosLocatariosPage),
    canActivate: [RoleGuard],
    data: { roles: ['administrador'] },
  },
  {
    path: 'registro-personal',
    loadComponent: () => import('./pages/admin/registro-personal/registro-personal.page').then( m => m.RegistroPersonalPage),
    canActivate: [RoleGuard],
    data: { roles: ['administrador'] },
  },
  {
    path: 'observaciones',
    loadComponent: () => import('./pages/admin/observaciones/observaciones.page').then( m => m.ObservacionesPage),
    canActivate: [RoleGuard],
    data: { roles: ['administrador'] },
  },
 
  {
    path: 'informaciones',
    loadComponent: () => import('./pages/admin/informaciones/informaciones.page').then( m => m.InformacionesPage),
    canActivate: [RoleGuard],
    data: { roles: ['administrador'] },
  },
  {
    path: 'registros',
    loadComponent: () => import('./pages/admin/registros/registros.page').then( m => m.RegistrosPage),
    canActivate: [RoleGuard],
    data: { roles: ['administrador'] },
  },
  
  {
    path: 'observaciones-rondas',
    loadComponent: () => import('./pages/guardia/observaciones-rondas/observaciones-rondas.page').then( m => m.ObservacionesRondasPage),
    canActivate: [RoleGuard],
    data: { roles: ['usuario'] },
  },
  {
    path: 'programar',
    loadComponent: () => import('./pages/programar/programar.page').then( m => m.ProgramarPage)
  },
 
  
  

  
   
];
