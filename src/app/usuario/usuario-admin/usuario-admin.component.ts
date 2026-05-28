import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerfilService } from '../perfil.service';
import { Usuario } from '../usuario';
import { OrdenCompra } from '../../orden-compra/orden-compra';
import { OrdenCompraService } from '../../orden-compra/orden-compra-service';
import { CuponService } from '../../cupon/cupon.service';
import { ToastrService } from 'ngx-toastr';

const ROLES = ['CLIENT', 'EXPERT', 'ADMIN'] as const;

interface FilaUsuario {
  usuario: Usuario;
  rolSeleccionado: string;
  cambiado: boolean;
  expandido: boolean;
  ordenes: OrdenCompra[];
  cuponForm: FormGroup;
  guardandoCupon: boolean;
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
  ordenesGlobal: OrdenCompra[] = [];
  readonly roles = ROLES;

  constructor(
    private perfilService: PerfilService,
    private ordenService: OrdenCompraService,
    private cuponService: CuponService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.perfilService.getUsuarios().subscribe({
      next: usuarios => {
        this.filas = usuarios.map(u => ({
          usuario: u,
          rolSeleccionado: u.rol,
          cambiado: false,
          expandido: false,
          ordenes: [],
          cuponForm: this.buildCuponForm(),
          guardandoCupon: false,
        }));
      },
      error: () => this.toastr.error('No se pudieron cargar los usuarios.'),
    });

    this.ordenService.getAllOrdenCompra().subscribe({
      next: ordenes => { this.ordenesGlobal = ordenes; },
      error: () => {},
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

  toggleExpandir(fila: FilaUsuario): void {
    fila.expandido = !fila.expandido;
    if (fila.expandido) {
      fila.ordenes = this.ordenesGlobal.filter(
        o => String(o.usuario?.id) === String(fila.usuario.id)
      );
    }
  }

  onRolChange(fila: FilaUsuario, nuevoRol: string): void {
    fila.rolSeleccionado = nuevoRol;
    fila.cambiado = nuevoRol !== fila.usuario.rol;
  }

  guardarRol(fila: FilaUsuario): void {
    this.perfilService.cambiarRol(String(fila.usuario.id), fila.rolSeleccionado).subscribe({
      next: u => {
        fila.usuario = { ...fila.usuario, rol: u.rol };
        fila.rolSeleccionado = u.rol;
        fila.cambiado = false;
        this.toastr.success(`Rol de ${u.nombre} actualizado a ${u.rol}`);
      },
      error: () => this.toastr.error('Error al cambiar el rol.'),
    });
  }

  asignarCupon(fila: FilaUsuario): void {
    if (fila.cuponForm.invalid) return;
    fila.guardandoCupon = true;
    const { codigoCupon, porcentaje, fechaVencimiento, ordenId } = fila.cuponForm.value;
    const payload: any = { codigoCupon, porcentaje: Number(porcentaje), fechaVencimiento };
    if (ordenId) payload.ordenId = ordenId;

    this.cuponService.createCupon(payload).subscribe({
      next: () => {
        this.toastr.success(`Cupón ${codigoCupon} creado.`);
        fila.cuponForm.reset();
        fila.guardandoCupon = false;
      },
      error: () => {
        this.toastr.error('Error al crear el cupón.');
        fila.guardandoCupon = false;
      },
    });
  }

  rolBadgeClass(rol: string): string {
    switch (rol) {
      case 'ADMIN':  return 'adm-rol-admin';
      case 'EXPERT': return 'adm-rol-expert';
      default:       return 'adm-rol-client';
    }
  }

  private buildCuponForm(): FormGroup {
    return this.fb.group({
      codigoCupon:      ['', Validators.required],
      porcentaje:       ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      fechaVencimiento: ['', Validators.required],
      ordenId:          [''],
    });
  }
}
