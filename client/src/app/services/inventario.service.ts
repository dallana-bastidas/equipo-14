// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { I_inventario, I_producto } from '../interface/config-interfaces';
// import { Observable } from 'rxjs';
// import { environment } from '../../environments/environment';

// @Injectable({
//     providedIn: 'root',
// })
// export class InventarioService {
//     private apiURL = `${environment.urlApi}/inventario`;


//     constructor(private http: HttpClient) { }

//     obtenerInventario() {
//         return this.http.get(`${this.apiURL}/obtener-inventario`);
//     }

//     buscarInventario(busqueda: string) {
//         return this.http.post(`${this.apiURL}/buscar-producto/`, busqueda);
//     }

//     crearInventario(inventario: FormData): Observable<any> {
//         return this.http.post(`${this.apiURL}/registrar-producto`, inventario);
//     }

//     editarInventario(inventario: any, id: string) {
//         return this.http.put(
//             `${this.apiURL}/modificar-inventario/${id}`,
//             inventario
//         );
//     }

//     eliminarInventario(id: string) {
//         return this.http.delete(`${this.apiURL}/eliminar-item/${id}`);
//     }

//     contarElementos(tipoContador: string): Observable<any> {
//         return this.http.get(`${this.apiURL}/contador-inventario/${tipoContador}`);
//     }
// }


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { I_inventario, I_producto } from '../interface/config-interfaces';

@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  private apiURL = `${environment.urlApi}/inventario`;

  constructor(private http: HttpClient) {}

  obtenerInventario(): Observable<I_inventario[]> {
    return this.http.get<I_inventario[]>(`${this.apiURL}/obtener-inventario`);
  }

  buscarInventario(busqueda: string): Observable<I_producto[]> {
    return this.http.post<I_producto[]>(`${this.apiURL}/buscar-producto/`, { query: busqueda });
  }

  crearInventario(inventario: FormData): Observable<any> {
    return this.http.post(`${this.apiURL}/registrar-producto`, inventario);
  }

  editarInventario(inventario: any, id: string): Observable<any> {
    return this.http.put(`${this.apiURL}/modificar-inventario/${id}`, inventario);
  }

  eliminarInventario(id: string): Observable<any> {
    return this.http.delete(`${this.apiURL}/eliminar-item/${id}`);
  }

  contarElementos(tipoContador: string): Observable<any> {
    return this.http.get(`${this.apiURL}/contador-inventario/${tipoContador}`);
  }
}


