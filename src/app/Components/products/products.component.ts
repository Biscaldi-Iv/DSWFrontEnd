import { Carrito } from 'src/app/Interfaces/Carrito';
import { environment } from '../environments/environment';
import { Component, Input } from '@angular/core';
import { Producto } from 'src/app/Interfaces/Producto';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { ProductoService } from 'src/app/services/productos/producto.service';

// Initialization for ES Users
import { Carousel, initTE } from "tw-elements";
import { CategoriaService } from 'src/app/services/categorias/categoria.service';
import { Categoria } from 'src/app/Interfaces/Categoria';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  @Input() categoria: string = '';
  @Input() busqueda: string = '';

  products: Producto[] = [];
  categs: Categoria[] = [];
  buyList: Carrito= this.Carrito.get();
  selectedProd: Producto | undefined;
  apiUrl = environment.apiUrl;

  constructor(private service: ProductoService, private Carrito:CarritoService, private Categorias: CategoriaService) { }

  ngOnInit() {
    initTE({ Carousel });
    this.service.getProductos().subscribe((res) => {
      this.products = res;
      console.log(this.products);
    });
    console.log(this.buyList);
    this.Categorias.get().subscribe((res) => {
      this.categs = res;
      console.log(this.categs);
    })
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

  filtrar() {
    let filtro='';
    if (this.categoria) {
      filtro+='categoria='+this.categoria;
    }
    if (this.busqueda) {
      filtro += '&nombre=' + this.busqueda;
    }
    this.service.getProductos(filtro).subscribe((res) => {
      this.products = res;
      console.log(this.products);
    });
  }

}
