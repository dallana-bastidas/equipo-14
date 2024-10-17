import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent {
  showFilters: boolean = true; // Controla la visibilidad
  disponibilidad: string = ''; // Opción seleccionada ('disponible' o 'noDisponible')
  veranoSeleccionado: boolean = false; // Opción de 'Verano'
  inviernoSeleccionado: boolean = false; // Opción de 'Invierno'
  
  // Propiedades para tallas
  tallaXSSeleccionada: boolean = false;
  tallaSSeleccionada: boolean = false;
  tallaMSeleccionada: boolean = false;
  tallaLSeleccionada: boolean = false;
  tallaXLSeleccionada: boolean = false;
  tallaUnicaSeleccionada: boolean = false;

  // Método para alternar la visibilidad del componente de filtros
  toggleFilters() {
    this.showFilters = !this.showFilters; // Cambia el estado de 'showFilters'
  }

  // Método para cerrar el overlay directamente
  closeOverlay() {
    this.showFilters = false; // Oculta los filtros
  }

  // Método para seleccionar la disponibilidad
  toggleDisponibilidad(opcion: string) {
    if (this.disponibilidad === opcion) {
      this.disponibilidad = ''; // Desmarcar si ya está seleccionada
    } else {
      this.disponibilidad = opcion; // Marcar la nueva opción
    }
  }

  // Método para verificar si la opción de disponibilidad está seleccionada
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

  // Método para contar filtros seleccionados
  get selectedFilterCount(): number {
    let count = 0;

    // Contar tallas seleccionadas
    const selectedSizes = [
      this.tallaXSSeleccionada,
      this.tallaSSeleccionada,
      this.tallaMSeleccionada,
      this.tallaLSeleccionada,
      this.tallaXLSeleccionada,
      this.tallaUnicaSeleccionada,
      this.veranoSeleccionado,
      this.inviernoSeleccionado
    ].filter(Boolean).length; // Filtrar las tallas seleccionadas

    // Contar disponibilidad seleccionada
    if (this.disponibilidad) {
      count++;
    }

    return count + selectedSizes; // Sumar tallas y disponibilidad
  }

  // Método para obtener el texto del botón Filtrar
  get filterButtonText(): string {
    const count = this.selectedFilterCount;
    return `Filtrar ${count > 0 ? `(${count})` : ''}`; // Texto dinámico
  }

    // Método para reiniciar los filtros
  resetFilters() {
    this.disponibilidad = ''; // Reiniciar disponibilidad
    this.veranoSeleccionado = false; // Reiniciar opción de Verano
    this.inviernoSeleccionado = false; // Reiniciar opción de Invierno

    // Reiniciar las tallas
    this.tallaXSSeleccionada = false;
    this.tallaSSeleccionada = false;
    this.tallaMSeleccionada = false;
    this.tallaLSeleccionada = false;
    this.tallaXLSeleccionada = false;
    this.tallaUnicaSeleccionada = false;
  }
}
