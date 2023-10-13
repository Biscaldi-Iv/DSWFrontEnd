import { Carrito } from 'src/app/Interfaces/Carrito';
import { environment } from '../environments/environment';
import { Component } from '@angular/core';
import { Producto } from 'src/app/Interfaces/Producto';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { ProductoService } from 'src/app/services/productos/producto.service';

// Initialization for ES Users
import { Carousel, initTE } from "tw-elements";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Producto[] = [];
  buyList: Carrito= this.Carrito.get();
  selectedProd: Producto | undefined;
  apiUrl = environment.apiUrl;

  constructor(private service: ProductoService, private Carrito:CarritoService) { }

  ngOnInit() {
    initTE({ Carousel });
    this.service.getProductos().subscribe((res) => {
      this.products = res;
      console.log(this.products);
    });
    console.log(this.buyList);
  }

  agregarAlCarrito(prod: Producto) {
    this.buyList = this.Carrito.get();
    for (let item of this.buyList.productos!) {
      if (item?.producto!._id == prod._id) {
        item!.cantidad! += 1;
        this.Carrito.save(this.buyList);
        console.log('cantidad incrementada');
        return;
      }
    }
    this.buyList.productos!.push({ 'producto': prod, 'cantidad': 1 });
    this.Carrito.save(this.buyList);
    console.log('producto agregado');
  }

}
