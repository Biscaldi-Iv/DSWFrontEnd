import { Component } from '@angular/core';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent {
  listaUser=true;
  nada(){
  }
  mostrarCategorias:boolean=false;
  mostrarPublicaciones:boolean=false;

  ngOnInit(){

  }
  
  mostrarListaUser(){
    this.listaUser=true;
    this.mostrarCategorias=false;
    this.mostrarPublicaciones=false;
  }
  listaCategorias(){
    this.listaUser=false;
    this.mostrarCategorias=true;
    this.mostrarPublicaciones=false;
  }
  mostrarMisProductos(){
    this.listaUser=false;
    this.mostrarCategorias=false;
    this.mostrarPublicaciones=true;
  }
}
