import { Component } from '@angular/core';


@Component({
  selector: 'app-panel-tienda',
  templateUrl: './panel-tienda.component.html',
  styleUrls: ['./panel-tienda.component.css']
})
export class PanelTiendaComponent {
  constructor(){}
  infoTienda:boolean=true;
  mostrarProducto:boolean=false;
  mostrarPublicaciones:boolean=false;
  
  mostrarConfiguracion(){
    this.infoTienda=true;
    this.mostrarProducto=false;
    this.mostrarPublicaciones=false;
  }
  nuevoProducto(){
    this.infoTienda=false;
    this.mostrarProducto=true;
    this.mostrarPublicaciones=false;
  }
  mostrarMisProductos(){
    this.infoTienda=false;
    this.mostrarProducto=false;
    this.mostrarPublicaciones=true;
  }
  
}
