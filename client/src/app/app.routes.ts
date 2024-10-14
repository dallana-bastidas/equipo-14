import { Routes } from '@angular/router';
import { FiltrosComponent } from './filtros/filtros.component';
import { InformacionGeneralComponent } from './informacion-general/informacion-general.component';
import { InventarioComponent } from './inventario/inventario.component';
import { NavbarProductoComponent } from './navbar-producto/navbar-producto.component';


export const routes: Routes = [
  { path: 'inventario', component: InventarioComponent },
  { path: 'filtros', component: FiltrosComponent },
  { path: 'producto', component: NavbarProductoComponent },
  { path: 'nuevo', component: InformacionGeneralComponent },
];
