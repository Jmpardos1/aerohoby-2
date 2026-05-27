import { Usuario } from '../usuario/usuario';

export interface Review {
  id: string;
  puntuacion: number;
  fecha: string;
  contenido: string;
  usuarioId: string;
  autor?: Usuario; 
}