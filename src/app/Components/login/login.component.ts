import { Component, Input } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/IUsuarios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Input() email: string ='';
  @Input() password: string = '';
  usuario: Usuario = { email: this.email, password: this.password };

  constructor(private usuarioServicio: UsuarioService, private router: Router){}

  ingresar() {
    this.usuarioServicio
      .login(this.usuario)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
          return;
        }
    );
    this.router.navigate(['/']);
  }
}
