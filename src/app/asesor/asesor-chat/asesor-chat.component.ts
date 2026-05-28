import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AsesorArticulo, AsesorChatResponse, AsesorChatService, AsesorProducto } from '../asesor-chat.service';

interface ChatMensaje {
  autor: 'cliente' | 'asesor';
  texto: string;
  productos?: AsesorProducto[];
  articulos?: AsesorArticulo[];
  modo?: string;
}

@Component({
  selector: 'app-asesor-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, DecimalPipe],
  templateUrl: './asesor-chat.component.html',
  styleUrl: './asesor-chat.component.css',
})
export class AsesorChatComponent implements AfterViewChecked {
  @ViewChild('mensajesRef') mensajesRef!: ElementRef<HTMLDivElement>;

  mensaje = '';
  cargando = false;
  sugerenciasUsadas = false;

  mensajes: ChatMensaje[] = [
    {
      autor: 'asesor',
      texto: 'Hola, soy tu asesor AeroHobby. ¿Qué quieres hacer: empezar con drones, grabar viajes, entrar al FPV o mejorar tu equipo?',
    },
  ];

  sugerencias = [
    'Drone para empezar y grabar viajes',
    'Accesorios para más autonomía',
    'Entrar al mundo FPV',
    'Presupuesto medio, fácil de usar',
  ];

  constructor(public asesorService: AsesorChatService) {}

  get abierto() { return this.asesorService.widgetAbierto(); }

  ngAfterViewChecked(): void {
    this.scrollBottom();
  }

  enviar(): void {
    const texto = this.mensaje.trim();
    if (!texto || this.cargando) return;

    this.sugerenciasUsadas = true;
    this.mensajes = [...this.mensajes, { autor: 'cliente', texto }];
    this.mensaje = '';
    this.cargando = true;

    this.asesorService.enviarMensaje(texto).subscribe({
      next: (r) => this.agregarRespuesta(r),
      error: () => {
        this.mensajes = [...this.mensajes, {
          autor: 'asesor',
          texto: 'No pude conectar con el asesor ahora. Asegúrate de que el backend esté activo.',
        }];
        this.cargando = false;
      },
    });
  }

  usarSugerencia(texto: string): void {
    this.mensaje = texto;
    this.enviar();
  }

  productoQueryParams(p: AsesorProducto): Record<string, string> {
    return { productoId: p.id };
  }

  private agregarRespuesta(r: AsesorChatResponse): void {
    this.mensajes = [...this.mensajes, {
      autor: 'asesor',
      texto: r.respuesta,
      productos: r.productos ?? [],
      articulos: r.articulos ?? [],
      modo: r.modo,
    }];
    this.cargando = false;
  }

  private scrollBottom(): void {
    if (this.mensajesRef) {
      const el = this.mensajesRef.nativeElement;
      el.scrollTop = el.scrollHeight;
    }
  }
}
