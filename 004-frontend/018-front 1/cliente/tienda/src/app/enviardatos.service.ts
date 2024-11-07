import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnviarDatosService {
  private apiUrl = 'https://jotauve.es/insertarCliente'; // URL del servidor

  constructor(private http: HttpClient) {}

  enviarCliente(nombre: string, apellidos: string): Observable<any> {
    const body = { nombre, apellidos };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}