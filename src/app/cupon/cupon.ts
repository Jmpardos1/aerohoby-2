import { OrdenCompra } from '../orden-compra/orden-compra';

export class Cupon {
  id!: string;
  codigoCupon!: string;
  porcentaje!: number;
  fechaVencimiento!: string;
  ordenCompra?: OrdenCompra | null;
}
