import { Component } from '@angular/core';
import { NavbarProductoComponent } from "../navbar-producto/navbar-producto.component";

@Component({
  selector: 'app-informacion-general',
  standalone: true,
  imports: [NavbarProductoComponent],
  templateUrl: './informacion-general.component.html',
  styleUrl: './informacion-general.component.css'
})
export class InformacionGeneralComponent {

}
