//import { Categoria } from "./Categoria";
import { Tienda } from "./Tienda";

export interface Producto{
  id?: string;
  tienda?: Tienda;
  categoria?: string; //id
  //reseña?: string[];
  nombre?: string;
  descripcion?: string;
  precio?: number;
  stock: number,
  fotos: string;
  habilitado: boolean;
}
