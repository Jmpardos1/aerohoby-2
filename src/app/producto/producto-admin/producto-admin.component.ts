import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from '../producto.service';
import { CategoriaService } from '../../categoria/categoria.service';
import { MarcaService } from '../../marca/marca.service';
import { ProveedorService, ProveedorItem } from '../../proveedor/proveedor.service';
import { Producto } from '../producto';
import { Categoria } from '../../categoria/categoria';
import { Marca } from '../../marca/marca';

@Component({
  selector: 'app-producto-admin',
  standalone: false,
  templateUrl: './producto-admin.component.html',
  styleUrl: './producto-admin.component.css',
})
export class ProductoAdminComponent implements OnInit {
  tab: 'productos' | 'categorias' | 'marcas' = 'productos';

  productos: Producto[] = [];
  categorias: Categoria[] = [];
  marcas: Marca[] = [];
  proveedores: ProveedorItem[] = [];

  productoEditando: Producto | null = null;
  mostrarCrear = false;

  createForm!: FormGroup;
  editForm!: FormGroup;
  categoriaForm!: FormGroup;
  marcaForm!: FormGroup;

  productoAsignarId = '';
  categoriaAsignarId = '';

  constructor(
    private readonly productoService: ProductoService,
    private readonly categoriaService: CategoriaService,
    private readonly marcaService: MarcaService,
    private readonly proveedorService: ProveedorService,
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm = this.fb.group({
      nombre:      ['', Validators.required],
      descripcion: ['', Validators.required],
      precio:      [0, [Validators.required, Validators.min(0)]],
      stock:       [0, [Validators.required, Validators.min(0)]],
      stockMinimo: [0, [Validators.required, Validators.min(0)]],
      marcaId:     ['', Validators.required],
      proveedorId: ['', Validators.required],
    });
    this.editForm = this.fb.group({
      nombre:      ['', Validators.required],
      descripcion: ['', Validators.required],
      precio:      [0, [Validators.required, Validators.min(0)]],
      stock:       [0, [Validators.required, Validators.min(0)]],
      stockMinimo: [0, [Validators.required, Validators.min(0)]],
    });
    this.categoriaForm = this.fb.group({
      nombre:      ['', Validators.required],
      descripcion: [''],
    });
    this.marcaForm = this.fb.group({
      nombre:      ['', Validators.required],
      descripcion: [''],
    });
    this.cargarTodo();
  }

  cargarTodo(): void {
    forkJoin({
      productos: this.productoService.getProductos(),
      categorias: this.categoriaService.getCategorias(),
      marcas: this.marcaService.getMarcas(),
      proveedores: this.proveedorService.getProveedores(),
    }).subscribe({
      next: ({ productos, categorias, marcas, proveedores }) => {
        this.productos = productos;
        this.categorias = categorias;
        this.marcas = marcas;
        this.proveedores = proveedores;
      },
      error: () => this.toastr.error('Error al cargar datos.'),
    });
  }

  crearProducto(): void {
    if (this.createForm.invalid) return;
    this.productoService.createProducto(this.createForm.value).subscribe({
      next: p => {
        this.productos.unshift(p);
        this.mostrarCrear = false;
        this.createForm.reset({ precio: 0, stock: 0, stockMinimo: 0 });
        this.toastr.success('Producto creado.');
      },
      error: (e: any) => this.toastr.error(e?.error?.message || 'Error al crear producto.'),
    });
  }

  abrirEditar(p: Producto): void {
    this.productoEditando = p;
    this.editForm.setValue({
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio: p.precio,
      stock: p.stock,
      stockMinimo: p.stockMinimo,
    });
  }

  guardarEditar(): void {
    if (!this.productoEditando || this.editForm.invalid) return;
    const id = String(this.productoEditando.id);
    const { nombre, descripcion, precio, stock, stockMinimo } = this.editForm.value;
    forkJoin([
      this.productoService.updateNombre(id, nombre),
      this.productoService.updateDescripcion(id, descripcion),
      this.productoService.updatePrecio(id, precio),
      this.productoService.updateStock(id, stock),
      this.productoService.updateStockMinimo(id, stockMinimo),
    ]).subscribe({
      next: () => {
        this.toastr.success('Producto actualizado.');
        this.productoEditando = null;
        this.cargarTodo();
      },
      error: () => this.toastr.error('Error al actualizar.'),
    });
  }

  eliminarProducto(id: string, e: Event): void {
    e.stopPropagation();
    if (!confirm('¿Eliminar este producto?')) return;
    this.productoService.deleteProducto(id).subscribe({
      next: () => {
        this.productos = this.productos.filter(p => String(p.id) !== id);
        this.toastr.success('Producto eliminado.');
      },
      error: () => this.toastr.error('Error al eliminar producto.'),
    });
  }

  asignarCategoria(): void {
    if (!this.productoAsignarId || !this.categoriaAsignarId) return;
    this.productoService.addCategoria(this.productoAsignarId, this.categoriaAsignarId).subscribe({
      next: () => {
        this.toastr.success('Categoría asignada.');
        this.productoAsignarId = '';
        this.categoriaAsignarId = '';
        this.cargarTodo();
      },
      error: (e: any) => this.toastr.error(e?.error?.message || 'Error al asignar.'),
    });
  }

  crearCategoria(): void {
    if (this.categoriaForm.invalid) return;
    this.categoriaService.createCategoria(this.categoriaForm.value).subscribe({
      next: c => {
        this.categorias.push(c);
        this.categoriaForm.reset();
        this.toastr.success('Categoría creada.');
      },
      error: () => this.toastr.error('Error al crear categoría.'),
    });
  }

  eliminarCategoria(id: string): void {
    if (!confirm('¿Eliminar esta categoría?')) return;
    this.categoriaService.deleteCategoria(id).subscribe({
      next: () => {
        this.categorias = this.categorias.filter(c => String(c.id) !== id);
        this.toastr.success('Categoría eliminada.');
      },
      error: () => this.toastr.error('Error al eliminar categoría.'),
    });
  }

  crearMarca(): void {
    if (this.marcaForm.invalid) return;
    this.marcaService.createMarca(this.marcaForm.value).subscribe({
      next: m => {
        this.marcas.push(m);
        this.marcaForm.reset();
        this.toastr.success('Marca creada.');
      },
      error: () => this.toastr.error('Error al crear marca.'),
    });
  }

  eliminarMarca(id: string): void {
    if (!confirm('¿Eliminar esta marca?')) return;
    this.marcaService.deleteMarca(id).subscribe({
      next: () => {
        this.marcas = this.marcas.filter(m => String(m.id) !== id);
        this.toastr.success('Marca eliminada.');
      },
      error: () => this.toastr.error('Error al eliminar marca.'),
    });
  }

  get stockBajo(): Producto[] {
    return this.productos.filter(p => p.stock <= p.stockMinimo);
  }
}
