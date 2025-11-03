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
    path: 'programar',
    loadComponent: () => import('./pages/programar/programar.page').then( m => m.ProgramarPage)
  },
  {
    path: 'gestion-locatarios',
    loadComponent: () => import('./pages/admin/gestion-locatarios/gestion-locatarios.page').then( m => m.GestionLocatariosPage),
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
    path: 'registros-guardia',
    loadComponent: () => import('./pages/guardia/registros-guardia/registros-guardia.page').then( m => m.RegistrosGuardiaPage),
    canActivate: [RoleGuard],
    data: { roles: ['guardia'] },
  },
  
 
  
  

  
   
];
