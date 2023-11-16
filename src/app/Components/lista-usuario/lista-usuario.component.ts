import { Component, HostListener } from '@angular/core';
import { Usuario } from 'src/app/Interfaces/Usuario';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})
export class ListaUsuarioComponent {
  constructor(private usuarioService:UsuarioService){

  }
  usuarios:Usuario[]=[]
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages:number=0;
  ngOnInit(){
    this.usuarioService.getAllUsuario().subscribe(res=>{
      this.usuarios=res
    })
  }
  isMobile = true;
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isMobile = window.innerWidth < 768;
    if (this.isMobile) {
      this.itemsPerPage = 6;
    }else{
      this.itemsPerPage = 10;
    }
  }
  getUsuarios(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.totalPages = Math.ceil(this.usuarios.length / this.itemsPerPage);
    return this.usuarios.slice(startIndex, endIndex);
  }
  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
   getPageNumbers(): number[] {
    const totalPages = Math.ceil(this.usuarios.length / this.itemsPerPage);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

}
