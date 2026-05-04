import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './usuario/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ISIS2603_202610_S2_E4_Aerohobby_Front');

  constructor(public authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
