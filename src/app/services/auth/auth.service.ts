import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    id_guardia?: number | null; 
    nombre: string;             
    email: string;
    rol: 'administrador' | 'guardia' | 'locatario';
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  // Login: obtiene el token y datos del usuario
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password });
  }

  // Guarda la sesión con todos los campos, incluido id_guardia
  saveSession(res: LoginResponse) {
    console.log('Sesión guardada:', res.user);
    localStorage.setItem('token', res.access_token);
    localStorage.setItem('user', JSON.stringify(res.user));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserId(): number {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload?.sub) {
          return Number(payload.sub);
        }
      } catch (e) {
        console.warn('Error al decodificar el token JWT:', e);
      }
    }
    const user = this.getUser();
    return user?.id ? Number(user.id) : 0;
  }

  // Ahora devuelve el nombre real (campo nombre)
  getUserName(): string {
    const user = this.getUser();
    return user?.nombre || '';
  }

  // NUEVO: obtener id_guardia directamente
  getGuardiaId(): number | null {
    const user = this.getUser();
    return user?.id_guardia ?? null;
  }
}