import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroAdminService {
  private apiUrl = `${environment.apiUrl}/registro-ingresos-admin`;

  constructor(private http: HttpClient) { }


   obtenerTodasLasVisitas(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/todas`);
    }
}
