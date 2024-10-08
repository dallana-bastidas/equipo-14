import { Routes } from '@angular/router';
import { InventarioComponent } from './inventario/inventario.component';
import { NavbarComponent } from './navbar/navbar.component';

export const routes: Routes = [
  { path: 'navbar', component: NavbarComponent },
  { path: 'inventario', component: InventarioComponent },
];
