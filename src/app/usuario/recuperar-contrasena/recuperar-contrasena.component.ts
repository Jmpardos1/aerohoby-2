import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-recuperar-contrasena',
  standalone: false,
  templateUrl: './recuperar-contrasena.component.html',
  styleUrl: './recuperar-contrasena.component.css',
})
export class RecuperarContrasenaComponent {
  form: FormGroup;
  loading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {
    this.form = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      nuevaPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  recuperar(): void {
    if (this.form.invalid) return;
    this.loading = true;
    const { correo, nuevaPassword } = this.form.value;
    this.authService.recuperarContrasena(correo, nuevaPassword).subscribe({
      next: () => {
        this.toastr.success('Contraseña actualizada. Ya puedes iniciar sesión.');
        this.router.navigate(['/login']);
      },
      error: () => {
        this.toastr.error('No se encontró una cuenta con ese correo.');
        this.loading = false;
      },
    });
  }
}
