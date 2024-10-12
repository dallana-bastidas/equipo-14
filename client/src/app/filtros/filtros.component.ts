import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa el CommonModule

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [CommonModule], // Agrega CommonModule aquí
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent {
  showFilters: boolean = true; // Propiedad para controlar la visibilidad
  disponibilidad: string = ''; // Propiedad para controlar la opción seleccionada ('disponible' o 'noDisponible')
  veranoSeleccionado: boolean = false; // Propiedad para controlar la opción de 'Verano'
  inviernoSeleccionado: boolean = false; // Propiedad para controlar la opción de 'Invierno'

  // Método para alternar la visibilidad del componente de filtros
  toggleFilters() {
    this.showFilters = !this.showFilters; // Cambia el estado de 'showFilters'
  }

  // Método para cerrar el overlay directamente
  closeOverlay() {
    this.showFilters = false; // Oculta los filtros estableciendo showFilters en 'false'
  }

  // Método para seleccionar la disponibilidad (disponible o no disponible)
  toggleDisponibilidad(opcion: string) {
    if (this.disponibilidad === opcion) {
      this.disponibilidad = ''; // Si ya está seleccionada, desmarcar
    } else {
      this.disponibilidad = opcion; // De lo contrario, marcar la nueva opción
    }
  }

  // Método para verificar si la opción está seleccionada
  isSelected(opcion: string): boolean {
    return this.disponibilidad === opcion;
  }

  // Método para alternar la selección de 'Verano'
  toggleVerano() {
    this.veranoSeleccionado = !this.veranoSeleccionado;
  }

  // Método para alternar la selección de 'Invierno'
  toggleInvierno() {
    this.inviernoSeleccionado = !this.inviernoSeleccionado;
  }
}
