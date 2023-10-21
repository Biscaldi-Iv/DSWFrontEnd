import { Component, Input } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Interfaces/Usuario';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Input() email: string ='';
  @Input() password: string = '';
  usuario: Usuario = { email: this.email, password: this.password };
  message?: string = undefined;
  formlogin: FormGroup<{ usermail: FormControl<string | null | undefined>; userpassword: FormControl<string | null | undefined>; }>=new FormGroup({
      usermail: new FormControl(this.usuario.email, [Validators.required, Validators.email]),
      userpassword: new FormControl(this.usuario.password, [Validators.required, Validators.minLength(4), Validators.maxLength(16)])
  });

  constructor(private usuarioServicio: UsuarioService, private router: Router) { }

  ingresar() {
    this.usuarioServicio
      .login(this.usuario)
      .subscribe(
        (res) => {
          if (res.accessToken) {
            this.usuarioServicio.guardarToken(res.accessToken);
            this.router.navigate(['/']);
          } else {
            this.message = "Credenciales invalidas";
          }
        },
        (err) => {
          this.message = "Credenciales invalidas";
          //console.log(err.message);
        }
    );
  }
}
