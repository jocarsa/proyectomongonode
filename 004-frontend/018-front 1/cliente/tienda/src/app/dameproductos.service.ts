import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DameproductosService {

   constructor(private http: HttpClient) { }
    getData(): Observable<any> {
    return this.http.get<any>('http://jotauve.es:3000/coleccion/productos');
  }
}
