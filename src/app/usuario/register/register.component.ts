import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  readonly rol = 'CLIENT';
  error = '';
  showPassword = false;
  registerForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router, private toaster: ToastrService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onRegister(): void {
    this.error = '';
    if (this.registerForm.invalid) {
      this.toaster.error('Por favor, complete todos los campos correctamente.', 'Error');
      return;
    }
    this.authService.register(this.registerForm.value.nombre, this.registerForm.value.correo, this.registerForm.value.telefono, this.registerForm.value.password, this.rol).subscribe({
      next: () => {
        console.log('Se registro el usuario: \n'
           + this.userinfoprint(this.registerForm.value.correo, this.registerForm.value.nombre));
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

  userinfoprint(correo: string, nombre: string): string{
    return 'Correo: ' + correo + '\nNombre: ' + nombre;
  }
}
