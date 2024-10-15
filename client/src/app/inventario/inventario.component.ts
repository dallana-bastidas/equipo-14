import { Component } from '@angular/core';
import { FiltrosComponent } from '../filtros/filtros.component'; 
import { InventarioService } from '../services/inventario.service';
import { NgClass } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common'; 
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, FiltrosComponent,SidebarComponent,HeaderComponent, NgClass],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
})
export class InventarioComponent {
  inventarios: any[] = [];
  showFilters: boolean = false;

  constructor(private api: InventarioService) {}

  ngOnInit() {
    this.mostrarInventario();
    console.log('Initial showFilters:', this.showFilters);
  }

  mostrarInventario() {
    this.api.obtenerInventario().subscribe((data: any) => {
      this.inventarios = data;
    });
  }

  modificarInventario(id: string) {
    // Lógica para modificar el inventario
  }

  eliminarInventario(id: string) {
    // Lógica para eliminar el inventario
  }

  toggleFilters() {
    console.log("toggleFilters clicked");
    this.showFilters = !this.showFilters; 
  }
}
