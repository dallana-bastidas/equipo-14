import { Component } from '@angular/core';
import { FiltrosComponent } from '../filtros/filtros.component';
import { InventarioService } from '../services/inventario.service';
import { NgClass } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-inventario',
    standalone: true,
    imports: [CommonModule, FiltrosComponent, SidebarComponent, HeaderComponent, NgClass, ReactiveFormsModule, RouterLink],
    templateUrl: './inventario.component.html',
    styleUrls: ['./inventario.component.css'],
})
export class InventarioComponent {
    inventarios: any[] = [];
    showFilters: boolean = false;

    contadorProductos: number = 0;
    contadorStock: number = 0;
    contadorProveedores: number = 0;

    formBusqueda: FormGroup

    constructor(private api: InventarioService, private fb: FormBuilder) {
        this.formBusqueda = this.fb.group({
            busqueda: ['']
        })
    }

    ngOnInit() {
        this.mostrarInventario();
        this.alimentarContadores();
    }

    busquedaInventario() {
        console.log(this.formBusqueda.get('busqueda'));

        if (this.formBusqueda.get('busqueda')!.value != '') {
            this.api.buscarInventario(this.formBusqueda.value).subscribe((data: any) => {
                this.inventarios = data;
            });
        } else {
            this.mostrarInventario()
        }
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
        this.showFilters = !this.showFilters;
    }

    alimentarContadores() {
        this.api.contarElementos('productos').subscribe((data: any) => {
            this.contadorProductos = data;
        })

        this.api.contarElementos('stock').subscribe((data: any) => {
            this.contadorStock = data[0].totalCantidad;
        })

        this.api.contarElementos('proveedores').subscribe((data: any) => {
            this.contadorProveedores = data[0].totalProveedores;
        })
    }
}
