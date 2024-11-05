import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DameproductosService {

   constructor(private http: HttpClient) { }
    dameDatos(): Observable<any> {
    return this.http.get<any>('https://jotauve.es/coleccion/productos');
  }
}
