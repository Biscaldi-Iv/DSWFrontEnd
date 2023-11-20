import { UsuarioService } from './../../services/usuarios/usuario.service';
import { Carrito } from 'src/app/Interfaces/Carrito';
import { environment } from '../../../environments/environment';
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
  categoria: string = '';
  busqueda: string = '';
  message: string = '';
  paginas: number = 1;
  paginaActual: number = 1;
  filtro: string = 'page=1';

  products: Producto[] = [];
  categs: Categoria[] = [];
  buyList: Carrito= this.Carrito.get();
  selectedProd: Producto | undefined;
  apiUrl = environment.apiUrl;
  numbers?: number[];

  loading=true;

  constructor(private service: ProductoService, private Carrito:CarritoService, private Categorias: CategoriaService) { }

  ngOnInit() {
    initTE({ Carousel });
    this.service.getProductos().subscribe((res) => {
      this.products = res;
      this.loading=false;
    });
    this.service.cantPaginas().subscribe((res) => {
      this.paginas = res;
      this.numbers = Array(this.paginas).fill(0).map((x,i)=>i+1);
    });
    this.Categorias.get().subscribe((res) => {
      this.categs = res;
    });
  }

  agregarAlCarrito(prod: Producto) {
    let b = true;
    this.buyList = this.Carrito.get();
    for (let item of this.buyList.productos!) {
      if (item?.producto!._id == prod._id) {
        item!.producto = prod;
        item!.cantidad! += 1;
        this.message = `Se añadio ${prod.nombre} al carrito!`;
        if (item!.producto.stock < item!.cantidad!) {
          this.message = `No se puede añadir ${prod.nombre} al carrito!`;
          b = false;
          item!.cantidad = item!.producto.stock;
        }
        this.Carrito.save(this.buyList);
        this.notificar(b);
        return;
      }
    }
    this.buyList.productos!.push({ 'producto': prod, 'cantidad': 1 });
    this.Carrito.save(this.buyList);
    this.message = `Se añadio ${prod.nombre} al carrito!`;
    this.notificar();

  }

  notificar(b:boolean=true) {
    const successMessage = document.getElementById('successMessage');
    const msgcolor=document.getElementById('msgcolor')
    if (successMessage && msgcolor) {
      // Mostrar el cartel
      successMessage.classList.remove('hidden');
      if (!b) {
        msgcolor.classList.replace('bg-green-500', 'bg-red-500');
      }

      // Ocultar el cartel después de 2 segundos
      setTimeout(() => {
        successMessage.classList.add('hidden');
        if (!b) {
        msgcolor.classList.replace('bg-red-500', 'bg-green-500');
      }
      }, 2000);
    }
  }

  filtrar() {
     this.filtro='';
    if (this.categoria) {
      this.filtro+='categoria='+this.categoria;
    }
    if (this.busqueda) {
      this.filtro += '&nombre=' + this.busqueda;
    }
    if (this.filtro == '') {
      return;
    }
    else {
      this.filtro += '&page=1';
    }
    this.service.getProductos(this.filtro).subscribe((res) => {
      this.products = res;
    });
    this.service.cantPaginas(this.filtro).subscribe((res) => {
      this.paginas = res;
      this.numbers = Array(this.paginas).fill(0).map((x,i)=>i+1);
    });
    this.numbers = Array(this.paginas).fill(0).map((x, i) => i + 1);
    this.paginaActual = 1;
  }

  cambiarPagina(index: number) {
    if (index > this.paginas) { return; }
    this.filtro = this.filtro.replace(`page=${this.paginaActual}`, `page=${index}`);
    this.paginaActual = index;
    this.service.getProductos(this.filtro).subscribe((res) => {
      this.products = res;
    });
  }

}
