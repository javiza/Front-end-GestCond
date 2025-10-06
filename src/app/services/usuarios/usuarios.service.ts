import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';

export interface Usuario {
  id: number;
  nombre: string;
  rut: string;                // agregar rut
  email: string;
  password: string;
  rol: 'administrador' | 'usuario' | 'locatario'; // agregar locatario
  fecha_creacion?: string;  
}
export interface CreateUsuario {
  nombre: string;
  rut: string;
  email: string;
  password: string;
  rol: 'administrador' | 'usuario' | 'locatario';
}



@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  findAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  findOne(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

 create(usuario: CreateUsuario): Observable<Usuario> {
  return this.http.post<Usuario>(this.apiUrl, usuario, { headers: this.getHeaders() });
}


  update(id: number, usuario: Partial<Usuario>): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario, { headers: this.getHeaders() });
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
