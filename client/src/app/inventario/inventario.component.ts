import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { InventarioService } from '../services/inventario.service';
import { NgClass } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent,NgClass],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css',
})
export class InventarioComponent {
  inventarios: any[] = [];
  constructor(private api: InventarioService) {}

  ngOnInit (){
    this.mostrarInventario()
  }

  mostrarInventario() {
    this.api.obtenerInventario().subscribe((data: any) => {
      this.inventarios = data;
    });
  }

  modificarInventario(id:string){

  }

  eliminarInventario(id:string){
    
  }


}
