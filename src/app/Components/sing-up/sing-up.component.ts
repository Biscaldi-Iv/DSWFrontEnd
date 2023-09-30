import { Component } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, Validators, AbstractControl  } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import { Usuario } from '../../Interfaces/Usuario';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent {

  constructor(private usuarioServicio: UsuarioService, private router: Router){}
  usuario: Usuario = { email: '', direccion: '', telefono:'' , password: '' }
  signUpForm= new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'direccion': new FormControl('', Validators.required),
      'telefono': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'confirmPassword': new FormControl('', Validators.required),
    });



    crearCuenta() {
    
      if (this.signUpForm.valid) {
        this.usuario.email = this.signUpForm.value.email ?? undefined;
        this.usuario.direccion = this.signUpForm.value.direccion?? undefined;
        this.usuario.telefono = this.signUpForm.value.telefono?? undefined;
        this.usuario.password = this.signUpForm.value.password?? undefined;
        this.usuarioServicio.register(this.usuario).subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
            return;
          }
        );
      } else {
      
      }
      this.router.navigate(['/'])
  }

}
