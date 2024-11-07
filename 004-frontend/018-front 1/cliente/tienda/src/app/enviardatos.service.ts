import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnviarDatosService {
  private apiUrl = 'https://jotauve.es/insertarPedido';

  constructor(private http: HttpClient) {}

  enviarPedido(pedido: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, pedido, { headers });
  }
}
