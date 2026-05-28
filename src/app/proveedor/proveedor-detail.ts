import { Proveedor } from './proveedor';
import { ProductoSummary } from '../producto/producto-summary';

export interface ProveedorDetail extends Proveedor {
  productos: ProductoSummary[];
}
