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
import { loginGuard } from './guards/login.guard';


export const routes: Routes = [
    { path: 'formulario-producto', component: AddProductComponent, canActivate: [loginGuard] },
    { path: 'confirmar-eliminar', component: ConfirmarEliminarComponent, canActivate: [loginGuard] },
    { path: 'filtros', component: FiltrosComponent, canActivate: [loginGuard] },
    { path: 'header', component: HeaderComponent, canActivate: [loginGuard] },
    { path: 'inventario', component: InventarioComponent, canActivate: [loginGuard] },
    { path: 'landing-page', component: LandingPageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'sidebar', component: SidebarComponent, canActivate: [loginGuard] },
    { path: '**', redirectTo: '/landing-page', pathMatch: 'full' },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
