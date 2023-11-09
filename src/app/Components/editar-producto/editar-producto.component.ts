import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from 'src/app/Interfaces/Categoria';
import { Producto } from 'src/app/Interfaces/Producto';
import { CategoriaService } from 'src/app/services/categorias/categoria.service';
import { ProductoService } from 'src/app/services/productos/producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent {
  constructor(private productoServicio:ProductoService, private route: ActivatedRoute, private categoriaService:CategoriaService){}
  producto: Producto= { categoria:'', nombre:'', descripcion:'', precio:0, stock:0, fotos:'', habilitado:true};
  prodForm= new FormGroup({
    'categoria': new FormControl('', Validators.required),
    'nombre': new FormControl('', Validators.required),
    'descripcion': new FormControl('', Validators.required),
    'precio': new FormControl('', Validators.required),
    'stock': new FormControl('', Validators.required),
    'archivo': new FormControl(null, Validators.required)    
  });
  selectedFiles!: FileList;
  categoria: string='';
  categorias: Categoria[] = [];
  id:string='';
  ngOnInit() {
    this.categoriaService.get().subscribe((res) => {
      this.categorias = res;
      this.categoria=this.categorias[0].descripcion || '';
      console.log(this.categorias);
    })
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.productoServicio.getOne(this.id).subscribe(res => {
      this.producto = res;
      this.prodForm.patchValue({
        categoria: this.producto.categoria,
        nombre: this.producto.nombre,
        descripcion: this.producto.descripcion,
        precio: this.producto.precio.toString(),
        stock: this.producto.stock.toString()
      });
    });

  }

  onFileSelected(event: any){
    this.selectedFiles = event.target.files;
  }
  publicarProducto(){
    if(this.prodForm.valid){
      
      this.producto.categoria = this.prodForm.value.categoria ?? undefined;
      this.producto.nombre = this.prodForm.value.nombre?? undefined;
      this.producto.descripcion = this.prodForm.value.descripcion?? undefined;
      this.producto.precio = parseInt(this.prodForm.value.precio ?? '0');
      this.producto.stock = parseInt(this.prodForm.value.stock ?? '0');
      this.productoServicio.editarProducto(this.id, this.producto, this.selectedFiles).subscribe(
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
