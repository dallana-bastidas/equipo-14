import { Routes } from '@angular/router';
import { FiltrosComponent } from './filtros/filtros.component';
import { InventarioComponent } from './inventario/inventario.component';
import { NavbarProductoComponent } from './navbar-producto/navbar-producto.component';
import { NavbarComponent } from './navbar/navbar.component';

export const routes: Routes = [
  { path: 'navbar', component: NavbarComponent },
  { path: 'inventario', component: InventarioComponent },
  { path: 'filtros', component: FiltrosComponent },
  { path: 'producto', component: NavbarProductoComponent },
];
