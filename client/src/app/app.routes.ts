import { RouterModule, Routes } from '@angular/router';
import { FiltrosComponent } from './filtros/filtros.component';
import { InventarioComponent } from './inventario/inventario.component';
import { LoginComponent } from './login/login.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ConfirmarEliminarComponent } from './confirmar-eliminar/confirmar-eliminar.component';
import { HeaderComponent } from './header/header.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgModule } from '@angular/core';


export const routes: Routes = [
  { path: 'add-product', component: AddProductComponent },
  { path: 'confirmar-eliminar', component: ConfirmarEliminarComponent},
  { path: 'filtros', component: FiltrosComponent },
  { path: 'header', component: HeaderComponent},
  { path: 'inventario', component: InventarioComponent },
  { path: 'landing-page', component: LandingPageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'sidebar', component: SidebarComponent},
  { path: '', redirectTo: '/landing-page', pathMatch: 'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class AppRoutingModule{}