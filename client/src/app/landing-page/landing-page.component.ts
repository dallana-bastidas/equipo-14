import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
import { I_inventario } from '../interface/config-interfaces';
import { InventarioService } from '../services/inventario.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
    selector: 'app-landing-page',
    standalone: true,
    imports: [RouterLink, CommonModule, SidebarComponent],
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
    urlImagen!: string;
    dataProductos: any;
    variacionNavbar: boolean = false;

    @ViewChild(SidebarComponent) herencia__SidebarComponent!: SidebarComponent;

    constructor(
        private _apiService: InventarioService,
        private router: Router,
    ) {}

    ngOnInit() {
        this.variacionNavbar = !sessionStorage.getItem('login') ? false : true;

        this.urlImagen = environment.socketUrlApi;
        this._apiService.obtenerInventario().subscribe({
            next: (res) => {
                this.dataProductos = res;
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    btnWasa() {
        window.open('https://wa.me/+573195284474', '_blank');
    }

    cicloInventarioTallas(inventario: I_inventario | any) {
        let data = inventario.filter((info: any) => info.checked === true);
        let textoPagina: any[] = [];
        data.forEach((infoTalla: any) => {
            textoPagina.push(infoTalla.talla);
        });
        return textoPagina.join(', ');
    }

    cerrarSession() {
        sessionStorage.clear();
        this.router.navigate(['/login']);
    }
}
