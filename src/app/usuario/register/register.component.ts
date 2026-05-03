import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  nombre = '';
  correo = '';
  telefono = '';
  password = '';
  readonly rol = 'CLIENT';
  error = '';
  showPassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    this.error = '';
    if (this.password.length < 8) {
      this.error = 'La contraseña debe tener mínimo 8 caracteres.';
      return;
    }
    this.authService.register(this.nombre, this.correo, this.telefono, this.password, this.rol).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        if (err.status === 409 || err.status === 400) {
          this.error = 'El correo ya está registrado o los datos son inválidos.';
        } else {
          this.error = 'No se pudo crear la cuenta. Inténtalo de nuevo.';
        }
      },
    });
  }
}
