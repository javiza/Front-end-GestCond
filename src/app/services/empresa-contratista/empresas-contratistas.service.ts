import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface EmpresaContratista {
  id: number;
  nombre_encargado: string;
  nombre_empresa: string;
  rut: string;
  rubro: string;
  telefono: string;
  email: string;
}

export interface CreateEmpresaContratista {
  nombre_encargado: string;
  nombre_empresa: string;
  rut: string;
  rubro: string;
  telefono: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmpresasContratistasService {
  
private apiUrl = `${environment.apiUrl}/empresas-contratistas`;
  constructor(private http: HttpClient) {}

  findAll(): Observable<EmpresaContratista[]> {
    return this.http.get<EmpresaContratista[]>(this.apiUrl);
  }

  create(data: CreateEmpresaContratista): Observable<EmpresaContratista> {
    return this.http.post<EmpresaContratista>(this.apiUrl, data);
  }

  update(id: number, data: Partial<CreateEmpresaContratista>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
