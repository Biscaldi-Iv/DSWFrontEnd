import { Component, HostListener  } from '@angular/core';
import { environment } from '../environments/environment';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  Url = environment.Url;
  isMenuOpen = true;
  isMobile = true;
  accessToken ='';
  tipoUsuario='';
  constructor(public usuarioService: UsuarioService, private  authService: AuthService, private router: Router) {}


  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isMobile = window.innerWidth < 768;
    if (this.isMobile) {
      this.isMenuOpen = false;
    }else{
      this.isMenuOpen = true;
    }
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  ngOnInit() {
    if (this.usuarioService.estaAutentificado()) {
      this.authService.getRole().subscribe(
        res=>{
          console.log(res.data)
          this.tipoUsuario=res.data;
        }
      );
    }
  }


  inicio(){
    this.router.navigate(['/'])
  }
  carrito() {
    this.router.navigate(['/carrito'])
  }
  login(){
    this.router.navigate(['/login'])
  }
  registrarse(){
    this.router.navigate(['/singup'])
  }
  cerrarSesion(){
    this.usuarioService.logout();
    this.inicio();
  }
  configuracion(){
    this.router.navigate(['/configuracion'])
  }
  crearTienda(){
    this.router.navigate(['/crear-tienda'])
  }
  panelTienda(){
    this.router.navigate(['/panel-tienda'])
  }
  panelAdmin(){
    this.router.navigate(['/panel-admin'])
  }
}
