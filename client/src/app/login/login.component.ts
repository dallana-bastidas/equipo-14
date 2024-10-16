import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule, RouterModule],
})
export class LoginComponent {
  email: string = ''; 
  password: string = ''; 
  emailError: string = ''; 
  passwordError: string = ''; 

  constructor(private router: Router, private _loginService: LoginService) {}

  // Validar el correo electrónico
  validateEmail(): void {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email) {
      this.emailError = 'El correo electrónico es obligatorio.';
    } else if (!emailPattern.test(this.email)) {
      this.emailError = 'Por favor, introduce un correo electrónico válido.';
    } else {
      this.emailError = '';
    }
  }

  // Validar la contraseña
  validatePassword(): void {
    if (!this.password) {
      this.passwordError = 'La contraseña es obligatoria.';
    } else if (this.password.length < 6) {
      this.passwordError = 'La contraseña debe tener al menos 6 caracteres.';  // Se corrigió el mínimo a 6
    } else {
      this.passwordError = '';
    }
  }

  // Manejar el inicio de sesión
  onLogin(): void {
    this.validateEmail();
    this.validatePassword();

    if (!this.emailError && !this.passwordError) {
      this._loginService.iniciarSesion({ email: this.email, clave: this.password }).subscribe({
        next: () => {
          this.router.navigate(['/inventario']);
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Correo electrónico o contraseña inválidos.',
            text: 'Por favor, inténtalo de nuevo.',
            timer: 2000,
            showConfirmButton: false,
          });
        },
      });
    }
  }
}

