import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AñadirProductoComponent } from './components/add-product/add-product.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AñadirProductoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'stockit';
}
