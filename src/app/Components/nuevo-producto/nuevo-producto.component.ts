import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/Interfaces/Categoria';
import { Producto } from 'src/app/Interfaces/Producto';
import { CategoriaService } from 'src/app/services/categorias/categoria.service';
import { ProductoService } from 'src/app/services/productos/producto.service';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent {
  constructor(private productoServicio: ProductoService, private categoriaService:CategoriaService){}
  prodForm= new FormGroup({
    'categoria': new FormControl('', Validators.required),
    'nombre': new FormControl('', Validators.required),
    'descripcion': new FormControl('', Validators.required),
    'precio': new FormControl('', Validators.required),
    'stock': new FormControl('', Validators.required),
    'archivo': new FormControl(null, Validators.required)    
  });
  categoria: string='';
  categorias: Categoria[] = [];
  producto: Producto= { categoria:'', nombre:'', descripcion:'', precio:0, stock:0, fotos:'', habilitado:true};
  ngOnInit() {
    this.categoriaService.get().subscribe((res) => {
      this.categorias = res;
      this.categoria=this.categorias[0].descripcion || '';
      console.log(this.categorias);
    }) 
  }
  publicarProducto(){
    console.log(this.prodForm.valid)
    if(this.prodForm.valid){
      
      this.producto.categoria = this.prodForm.value.categoria ?? undefined;
      this.producto.nombre = this.prodForm.value.nombre?? undefined;
      this.producto.descripcion = this.prodForm.value.descripcion?? undefined;
      this.producto.precio = parseInt(this.prodForm.value.precio ?? '0');
      this.producto.stock = parseInt(this.prodForm.value.stock ?? '0');
      console.log(this.producto)
      console.log(this.selectedFiles)
      this.productoServicio.crearProducto(this.producto, this.selectedFiles).subscribe(
        res=>{
          this.mostrarCartel()
          console.log(res)
        }
      )
      
    }
  }
  selectCategoria(e:any){
    console.log(e.target.value);
    this.categoria=e.target.value;
  }
  selectedFiles!: FileList;
  onFileSelected(event: any){
    this.selectedFiles = event.target.files;
  }
  mostrarCartel() {
    const successMessage = document.getElementById('successMessage');

    if (successMessage) {
      // Mostrar el cartel
      successMessage.classList.remove('hidden');

      // Ocultar el cartel después de 2 segundos
      setTimeout(() => {
        successMessage.classList.add('hidden');
      }, 2000);
    }
  }
}
