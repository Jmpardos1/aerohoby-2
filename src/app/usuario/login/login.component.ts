import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  correo = '';
  password = '';
  error = '';
  showPassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.error = '';
    this.authService.login(this.correo, this.password).subscribe({
      next: () => {
        this.router.navigate(['/productos']);
      },
      error: () => {
        this.error = 'Correo o contraseña incorrectos.';
      },
    });
  }
}
