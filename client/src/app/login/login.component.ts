import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  emailError: string = '';
  passwordError: string = '';

  constructor(private router: Router) {}

  // Método para validar el correo electrónico
  validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email) {
      this.emailError = 'El correo electrónico es obligatorio.';
    } else if (!emailPattern.test(this.email)) {
      this.emailError = 'Por favor, introduce un correo electrónico válido.';
    } else {
      this.emailError = '';
    }
  }

  // Método para validar la contraseña
  validatePassword() {
    if (!this.password) {
      this.passwordError = 'La contraseña es obligatoria.';
    } else if (this.password.length < 6) {
      this.passwordError = 'La contraseña debe tener al menos 6 caracteres.';
    } else {
      this.passwordError = '';
    }
  }

  // Método para manejar el inicio de sesión
  onLogin() {
    this.validateEmail();
    this.validatePassword();

    if (!this.emailError && !this.passwordError) {
      // Lógica para el inicio de sesión (implementar tu autenticación aquí)
      this.router.navigate(['/home']); // ruta necesario
    }
  }
}
