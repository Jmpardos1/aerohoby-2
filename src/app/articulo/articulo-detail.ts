import { Articulo } from './articulo';
import { ProductoSummary } from '../producto/producto-summary';

export interface ArticuloDetail extends Articulo {
  productos: ProductoSummary[];
}
