import { Component } from '@angular/core';

@Component({
  selector: 'app-confirmar-eliminar',
  standalone: true,
  imports: [],
  templateUrl: './confirmar-eliminar.component.html',
  styleUrls: ['./confirmar-eliminar.component.css'] 
})
export class ConfirmarEliminarComponent {

  closeOverlay(): void {
    console.log('Operación cancelada');
    // Falta logica de funciones extras
  }

  // Método para confirmar la eliminación
  confirmDelete(): void {
    console.log('Producto eliminado');
    // Falta logica de funciones extras
  }
}
