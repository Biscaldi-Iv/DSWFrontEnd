import { Component } from '@angular/core';
import { Producto } from 'src/app/Interfaces/Producto';
import { ProductoService } from 'src/app/services/productos/producto.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Producto[] = [];
  selectedProd: Producto | undefined;

  constructor(private service: ProductoService) { }

  ngOnInit() {
    this.service.getProductos().subscribe(res => this.products = res);
  }

}
