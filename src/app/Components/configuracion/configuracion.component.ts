import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Interfaces/Usuario';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent {
  constructor(private usuarioServicio: UsuarioService, private router: Router){}
  usuario: Usuario = { email: '', direccion: '', telefono:'' , password: '' }
  /* mostrarCartel: boolean = false; */
  infoForm= new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'direccion': new FormControl('', Validators.required),
    'telefono': new FormControl('', Validators.required),
  });
  passForm= new FormGroup({
    'contrasenia': new FormControl('', Validators.required),
    'confirmContrasenia': new FormControl('', Validators.required),
  });

  ngOnInit() {
  this.usuarioServicio.getUsuarioByToken().subscribe(res => {
    this.usuario = res; 
    this.infoForm.patchValue({
      email: this.usuario.email,
      telefono: this.usuario.telefono,
      direccion: this.usuario.direccion
    });
  });
  }

  guardarInfo(){
    if (this.infoForm.valid) {
      this.usuario.email = this.infoForm.value.email ?? undefined;
      this.usuario.direccion = this.infoForm.value.direccion?? undefined;
      this.usuario.telefono = this.infoForm.value.telefono?? undefined;
      this.usuarioServicio.updateUsuario(this.usuario).subscribe(
        res=>{
          this.mostrarCartel();
          console.log(res);
      });
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
  cambiarPass(){
    if (this.passForm.valid) {
      this.usuario.password = this.passForm.value.contrasenia ?? undefined;
      this.usuarioServicio.updatePass(this.usuario).subscribe(
        response=>{
          this.mostrarCartel();
          console.log(response);
        }
      );
    }
  }

  eliminarCuenta(){
    this.usuarioServicio.deleteUser().subscribe(
      res=>{
        console.log(res)
      }
    )
    this.usuarioServicio.logout()
    this.router.navigate(['/']);
  }
}
