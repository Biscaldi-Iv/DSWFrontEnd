import { Producto } from "./Producto";

export interface Carrito{
  apertura?: Date;
  productos?: [{ producto?: Producto, cantidad?: number }?];
}
