import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FiltrosComponent } from './filtros/filtros.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FiltrosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}
