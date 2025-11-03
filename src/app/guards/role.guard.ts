import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { jwtDecode } from 'jwt-decode';

interface CustomJwtPayload {
  sub: string;
  email: string;
  rol: 'administrador' | 'guardia' | 'locatario';
}

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles: string[] = route.data['roles'];
    const token = this.authService.getToken();

    if (!token) {
      this.router.navigate(['/home']);
      return false;
    }

    try {
      
      const decoded = jwtDecode<CustomJwtPayload>(token);

      if (!expectedRoles.includes(decoded.rol)) {
        this.router.navigate(['/home']);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error decodificando token:', error);
      this.router.navigate(['/home']);
      return false;
    }
  }
}
