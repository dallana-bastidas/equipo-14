import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
@Component({
    selector: 'app-sidebar',
    standalone: true,
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    imports: [CommonModule, RouterLink],
})
export class SidebarComponent {
    inventoryOpen = false;
    providersOpen = false;
    constructor(private router: Router){ }
    // Método para alternar el estado del submenú de inventario
    toggleInventory() {
        this.inventoryOpen = !this.inventoryOpen;
    }
    // Método para alternar el estado del submenú de proveedores
    toggleProviders() {
        this.providersOpen = !this.providersOpen;
    }

    public logOut() {
        sessionStorage.clear();
        this.router.navigate(['/login']);
    }
}
