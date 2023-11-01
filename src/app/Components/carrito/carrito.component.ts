import { Component } from '@angular/core';
import { Carrito } from 'src/app/Interfaces/Carrito';
import { Categoria } from 'src/app/Interfaces/Categoria';
import { Producto } from 'src/app/Interfaces/Producto';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { CategoriaService } from 'src/app/services/categorias/categoria.service';
import { ProductoService } from 'src/app/services/productos/producto.service';
import { environment } from '../environments/environment';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  categorias: Categoria[] = [];
  micarrito: Carrito | undefined;
  apiUrl = environment.apiUrl;
  formCompra:FormGroup =this.fb.group({
    lineasCompra: this.fb.array([])
  });


  constructor(private productoService: ProductoService, private Carrito: CarritoService,
    private catService: CategoriaService, private fb: FormBuilder,private UsuarioService:UsuarioService) { }

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
      this.agregarLinea({ producto: item!.producto!, cantidad: item!.cantidad! });
    }
    this.Carrito.save(this.micarrito);
  }

  getCat(id: string):Categoria {
    return this.categorias.find((element) => element._id == id)!;
  }

  get lineasCompra() {
    return this.formCompra.controls['lineasCompra'] as
      FormArray<FormGroup<{
        producto: FormControl<string|null>,
        cantidad: FormControl<number|null>,
        precio: FormControl<number|null>
      }>>;
  }

  agregarLinea(item: { producto: Producto, cantidad: number }) {
    const form = this.fb.group({
      producto: [item.producto._id!, Validators.required],
      cantidad: [item.cantidad!, [Validators.required, Validators.min(0), Validators.max(item.producto.stock)]],
      precio: [item.producto.precio!, Validators.required]
    });
    this.lineasCompra.push(form);
  }

  comprar() {
    let compra = {comprador:'',productos:(this.lineasCompra.value.filter((l) => l!.cantidad! > 0) as [{producto:string,cantidad:number,precio:number}])};
    this.UsuarioService.getUsuarioByToken().subscribe((usr) => {
      compra.comprador = usr._id!;
      console.log(compra);
      this.Carrito.comprar(compra).subscribe((msg) => {
        console.log(msg);
      });
    });
  }

  reducirCant(_t12: number, e: HTMLButtonElement) {
    //console.log(e.nextElementSibling!.nextElementSibling);
    (e.nextElementSibling!.nextElementSibling as HTMLButtonElement).disabled=false;
    let v = (this.lineasCompra.controls.at(_t12)!.controls.cantidad.value as number) - 1;
    if (v<=0) {
      e.disabled = true;
    }
    this.lineasCompra.controls.at(_t12)!.controls.cantidad.setValue(v);
    if (this.lineasCompra.controls.at(_t12)!.controls.cantidad.invalid) {
      e.disabled = true;
      v += 1;
      this.lineasCompra.controls.at(_t12)!.controls.cantidad.setValue(v);
    }
    this.micarrito!.productos!.at(_t12)!.cantidad = v;
    this.Carrito.save(this.micarrito!);
  }

  incrementarCant(_t12: number, e: HTMLButtonElement) {
    //console.log(e.parentElement!.firstElementChild);
    (e.parentElement!.firstElementChild as HTMLButtonElement).disabled=false;
    let v = (this.lineasCompra.controls.at(_t12)!.controls.cantidad.value as number) + 1;
    this.lineasCompra.controls.at(_t12)!.controls.cantidad.setValue(v);
    if (this.lineasCompra.controls.at(_t12)!.controls.cantidad.invalid) {
      e.disabled = true;
      v -= 1;
      this.lineasCompra.controls.at(_t12)!.controls.cantidad.setValue(v);
    }
    this.micarrito!.productos!.at(_t12)!.cantidad = v;
    this.Carrito.save(this.micarrito!);
  }

  remover(index: number) {
    console.log(index);
    //Tiene un bug y siempre elimina el ultimo elemento
    //this.lineasCompra.removeAt(index);

    //console.log(this.micarrito!.productos!.filter((_e, idx) => idx != index));
    //console.log(this.micarrito!.productos);
    this.formCompra=this.fb.group({
      lineasCompra: this.fb.array([])
    });
    this.micarrito!.productos = (this.micarrito!.productos!.filter((_e, idx) => idx != index) as [{producto:Producto, cantidad:number}]);//esto funciona pero da errores
    this.micarrito!.productos!.forEach((linea) => {
      this.agregarLinea({ producto: linea!.producto!, cantidad: linea!.cantidad! });
    });
    console.log(this.micarrito!.productos);
    this.Carrito.save(this.micarrito!);
  }

  total():number {
    let t = 0;
    this.micarrito!.productos!.forEach((el) => {
      t += el!.cantidad! * el!.producto!.precio!;
    });
    return t;
  }

}
