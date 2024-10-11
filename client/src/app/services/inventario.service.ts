import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  private apiURL = 'http://localhost:5200/api/inventario';

  constructor(private http: HttpClient) {}

  obtenerInventario() {
    return this.http.get(`${this.apiURL}/obtener-inventario`);
  }

  crearInventario(inventario: any) {
    return this.http.post(`${this.apiURL}/crear-inventario`, inventario);
  }

  editarInventario(inventario: any, id: string) {
    return this.http.put(
      `${this.apiURL}/modificar-inventario/${id}`,
      inventario
    );
  }

  eliminarInventario(id: string) {
    return this.http.delete(`${this.apiURL}/eliminar-item/${id}`);
  }
}
