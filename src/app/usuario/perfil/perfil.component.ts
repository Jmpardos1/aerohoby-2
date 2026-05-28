import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PerfilService } from '../perfil.service';
import { AuthService } from '../auth.service';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent implements OnInit {
  perfil: Usuario | undefined;
  nuevaDireccion = '';
  mostrarEditar = false;
  editForm!: FormGroup;

  constructor(
    private readonly perfilService: PerfilService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('uid');
    if (!userId) {
      this.authService.logout();
      this.router.navigate(['/login']);
      return;
    }
    this.perfilService.getPerfil(userId).subscribe({
      next: p => (this.perfil = p),
      error: () => {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }

  abrirEditar(): void {
    this.editForm = this.fb.group({
      nombre:   [this.perfil?.nombre,   [Validators.required]],
      correo:   [this.perfil?.correo,   [Validators.required, Validators.email]],
      telefono: [this.perfil?.telefono],
      password: ['', [Validators.minLength(8)]]
    });
    this.mostrarEditar = true;
  }

  guardarEditar(): void {
    if (!this.perfil || this.editForm.invalid) return;
    const userId = localStorage.getItem('uid')!;
    const { nombre, correo, telefono, password } = this.editForm.value;
    const payload: any = { ...this.perfil, nombre, correo, telefono, rol: this.perfil.rol };
    if (password) payload.password = password;
    this.perfilService.updatePerfil(userId, payload).subscribe(p => {
      this.perfil = p;
      this.mostrarEditar = false;
    });
  }

  agregarDireccion(): void {
    if (!this.perfil || !this.nuevaDireccion.trim()) return;
    const userId = localStorage.getItem('uid')!;
    const direcciones = [...(this.perfil.direcciones ?? []), this.nuevaDireccion.trim()];
    this.perfilService.updatePerfil(userId, { ...this.perfil, direcciones }).subscribe(p => {
      this.perfil = p;
      this.nuevaDireccion = '';
    });
  }

  eliminarDireccion(index: number): void {
    if (!this.perfil) return;
    const userId = localStorage.getItem('uid')!;
    const direcciones = (this.perfil.direcciones ?? []).filter((_, i) => i !== index);
    this.perfilService.updatePerfil(userId, { ...this.perfil, direcciones }).subscribe(p => this.perfil = p);
  }
}
