import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmarEliminarComponent } from './confirmar-eliminar/confirmar-eliminar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ConfirmarEliminarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}
