import { Routes } from '@angular/router';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
  //  Página principal para administrador
  {
    path: 'administrador',
    loadComponent: () =>
      import('./pages/administrador/administrador.page').then(
        (m) => m.AdministradorPage
      ),
    canActivate: [RoleGuard],
    data: { roles: ['administrador'] },
  },

 

  // 🔹 Página de usuario normal
  {
    path: 'ingresos',
    loadComponent: () =>
      import('./pages/ingresos/ingresos.page').then((m) => m.IngresosPage),
    canActivate: [RoleGuard],
    data: { roles: ['usuario'] },
  },

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
 
  
  

  
   
];
