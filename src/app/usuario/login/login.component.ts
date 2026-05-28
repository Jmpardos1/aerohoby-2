import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  error = '';
  showPassword = false;
  logform!: FormGroup;

  constructor(private authService: AuthService, private router: Router,
     private formBuilder: FormBuilder, private toaster: ToastrService) {}

  ngOnInit(): void {
    this.logform = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onLogin(): void {
    this.error = '';
    this.authService.login(this.logform.value.correo, this.logform.value.password).subscribe({
      next: () => {
        this.router.navigate(['/productos']);
      },
      error: () => {
        this.error = 'Correo o contraseña incorrectos.';
        this.toaster.error('Correo o contraseña incorrectos.', 'Error');
      },
    });
  }
}
