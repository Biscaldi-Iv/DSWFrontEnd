import { Component } from '@angular/core';
import { Carrito } from 'src/app/Interfaces/Carrito';
import { Categoria } from 'src/app/Interfaces/Categoria';
import { Producto } from 'src/app/Interfaces/Producto';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { CategoriaService } from 'src/app/services/categorias/categoria.service';
import { ProductoService } from 'src/app/services/productos/producto.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  categorias: Categoria[] = [];
  micarrito: Carrito | undefined;
  apiUrl = environment.apiUrl;
  constructor(private productoService: ProductoService, private Carrito: CarritoService,private catService:CategoriaService) { }

  ngOnInit() {
    this.catService.get().subscribe((res) => {
      this.categorias = res;
    });
    this.micarrito = this.Carrito.get();
    //para actualizar datos del producto
    for (let item of this.micarrito.productos!) {
      let id = item!.producto!._id!;
      this.productoService.getOne(id).subscribe((res) => {
        item!.producto = res;
      });
    }
    this.Carrito.save(this.micarrito);
  }

  getCat(id: string):Categoria {
    return this.categorias.find((element) => element._id == id)!;
  }

}
