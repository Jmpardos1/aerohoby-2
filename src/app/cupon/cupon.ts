export class Cupon {
  id!: string;
  codigoCupon!: string;
  porcentaje!: number;
  fechaVencimiento!: string;
  ordenCompra?: { id: string; estadoPedido: string; fechaOrden: string };
}
