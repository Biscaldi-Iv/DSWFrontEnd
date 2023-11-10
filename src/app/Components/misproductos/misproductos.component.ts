import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Producto } from 'src/app/Interfaces/Producto';
import { ProductoService } from 'src/app/services/productos/producto.service';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import { Usuario } from 'src/app/Interfaces/Usuario';
import { TiendaService } from 'src/app/services/tiendas/tienda.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-misproductos',
  templateUrl: './misproductos.component.html',
  styleUrls: ['./misproductos.component.css']
})
export class MisproductosComponent {
  constructor(private productoServicio: ProductoService,  private usuarioService:UsuarioService, private tiendaServicio: TiendaService,){}
  apiUrl = environment.apiUrl;
  producto: Producto= { categoria:'', nombre:'', descripcion:'', precio:0, stock:0, fotos:'', habilitado:true};
  products: Producto[] = [];
  usuario: Usuario = { email: '', direccion: '', telefono:'' , password: '', tienda:'' }
  idTienda:string='';
  ngOnInit() {
    this.usuarioService.getUsuarioByToken()
      .pipe(
        switchMap(usuario => {
          this.usuario = usuario;
          this.idTienda = this.usuario.tienda || '';
          return this.tiendaServicio.getProductosTienda(this.idTienda);
        })
      )
      .subscribe(products => {
        console.log(products);
        this.products = products;
        console.log(products);
      });
    
  }
}
