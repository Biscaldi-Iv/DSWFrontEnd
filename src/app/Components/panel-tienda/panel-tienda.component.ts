import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from 'src/app/Interfaces/Producto';
import { Tienda } from 'src/app/Interfaces/Tienda';
import { ProductoService } from 'src/app/services/productos/producto.service';
import { TiendaService } from 'src/app/services/tiendas/tienda.service';

@Component({
  selector: 'app-panel-tienda',
  templateUrl: './panel-tienda.component.html',
  styleUrls: ['./panel-tienda.component.css']
})
export class PanelTiendaComponent {
  constructor(private tiendaServicio: TiendaService, private productoServicio: ProductoService, private router: Router){}
  tienda: Tienda = { name: '', about: '', email:'' , shopAdress: '' };
  producto: Producto= { categoria:'', nombre:'', descripcion:'', precio:0, stock:0, fotos:'', habilitado:true};
  infoTienda:boolean=true;
  mostrarProducto:boolean=false;
  infoForm= new FormGroup({
    'name': new FormControl('', Validators.required),
    'about': new FormControl('', Validators.required),
    'shopAdress': new FormControl('', Validators.required),
    'email': new FormControl('', [Validators.required, Validators.email]),

  });

  prodForm= new FormGroup({
    'categoria': new FormControl('', Validators.required),
    'nombre': new FormControl('', Validators.required),
    'descripcion': new FormControl('', Validators.required),
    'precio': new FormControl('', Validators.required),
    'stock': new FormControl('', Validators.required),
    'archivo': new FormControl(null, Validators.required)    
  });
  guardarCambios(){
    if(this.infoForm.valid){
      if(this.infoForm.valid){
      this.tienda.name = this.infoForm.value.name ?? undefined;
      this.tienda.about = this.infoForm.value.about?? undefined;
      this.tienda.email = this.infoForm.value.email?? undefined;
      this.tienda.shopAdress = this.infoForm.value.shopAdress?? undefined;
      this.tiendaServicio.updateTienda(this.tienda).subscribe(
        res=>{
          this.mostrarCartel();
          console.log(res);
          }
        )
      }
    }
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
  mostrarConfiguracion(){
    this.infoTienda=true;
    this.mostrarProducto=false;
  }
  nuevoProducto(){
    this.infoTienda=false;
    this.mostrarProducto=true;
  }
  mostrarMisProductos(){
    this.infoTienda=false;
    this.mostrarProducto=false;
  }
  selectedFiles!: FileList;
  onFileSelected(event: any){
    this.selectedFiles = event.target.files;
  }
  eliminarTienda(){
    this.tiendaServicio.deleteTienda().subscribe(
      res=>{
        console.log(res)
        console.log('tienda eliminada')
      }
    )
  }
}
