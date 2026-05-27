import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../perfil.service';
import { Usuario } from '../usuario';
import { ToastrService } from 'ngx-toastr';

const ROLES = ['CLIENT', 'EXPERT', 'ADMIN'] as const;

interface FilaUsuario {
  usuario: Usuario;
  rolSeleccionado: string;
  cambiado: boolean;
}

@Component({
  selector: 'app-usuario-admin',
  standalone: false,
  templateUrl: './usuario-admin.component.html',
  styleUrl: './usuario-admin.component.css',
})
export class UsuarioAdminComponent implements OnInit {
  filas: FilaUsuario[] = [];
  busqueda = '';
  readonly roles = ROLES;

  constructor(private perfilService: PerfilService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.perfilService.getUsuarios().subscribe({
      next: usuarios => {
        this.filas = usuarios.map(u => ({
          usuario: u,
          rolSeleccionado: u.rol,
          cambiado: false
        }));
      },
      error: err => {
        console.error('Error cargando usuarios', err);
        this.toastr.error('No se pudieron cargar los usuarios.');
      }
    });
  }

  get filasFiltradas(): FilaUsuario[] {
    const q = this.busqueda.trim().toLowerCase();
    if (!q) return this.filas;
    return this.filas.filter(f =>
      f.usuario.nombre?.toLowerCase().includes(q) ||
      f.usuario.correo?.toLowerCase().includes(q)
    );
  }

  onRolChange(fila: FilaUsuario, nuevoRol: string): void {
    fila.rolSeleccionado = nuevoRol;
    fila.cambiado = nuevoRol !== fila.usuario.rol;
  }

  guardarRol(fila: FilaUsuario): void {
    this.perfilService.cambiarRol(String(fila.usuario.id), fila.rolSeleccionado).subscribe({
      next: u => {
        fila.usuario = u;
        fila.rolSeleccionado = u.rol;
        fila.cambiado = false;
        this.toastr.success(`Rol de ${u.nombre} actualizado a ${u.rol}`);
      },
      error: () => this.toastr.error('Error al cambiar el rol.')
    });
  }

  badgeClass(rol: string): string {
    switch (rol) {
      case 'ADMIN':  return 'bg-danger';
      case 'EXPERT': return 'bg-primary';
      default:       return 'bg-secondary';
    }
  }
}
