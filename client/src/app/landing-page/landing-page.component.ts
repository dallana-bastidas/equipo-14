// src/app/landing-page/landing-page.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  handleLogin(): void {
    if (this.isLoggedIn) {
      this.logout();
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  // Función para hacer scroll al inicio de la página
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Animación suave
    });
  }
}
