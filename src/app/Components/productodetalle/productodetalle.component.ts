import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/Interfaces/Producto';
import { ProductoService } from 'src/app/services/productos/producto.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-productodetalle',
  templateUrl: './productodetalle.component.html',
  styleUrls: ['./productodetalle.component.css']
})
export class ProductodetalleComponent {
  constructor(private productoService: ProductoService, private route: ActivatedRoute) { }
  producto: Producto= {_id:'', categoria:'', nombre:'', descripcion:'', precio:0, stock:0, fotos:'', habilitado:true};
  apiUrl = environment.apiUrl;
  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.productoService.getOne(id).subscribe(res=>{
      console.log(res)
      this.producto=res

    })
  }

  eliminarProducto(){
    const id = this.route.snapshot.paramMap.get('id') || '';
    console.log('aveereer')
    this.productoService.eliminarProducto(id).subscribe(
      res=>{
        console.log(res)
        console.log('producto eliminado eliminada')
      }
    )
  }
}
