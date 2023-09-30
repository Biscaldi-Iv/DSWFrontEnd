import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tienda } from 'src/app/Interfaces/Tienda';
import { TiendaService } from 'src/app/services/tiendas/tienda.service';

@Component({
  selector: 'app-crear-tienda',
  templateUrl: './crear-tienda.component.html',
  styleUrls: ['./crear-tienda.component.css']
})
export class CrearTiendaComponent {
  constructor(private tiendaServicio: TiendaService, private router: Router){}
  tienda: Tienda = { name: '', about: '', email:'' , shopAdress: '' }

  infoForm= new FormGroup({
    'nombreTienda': new FormControl('', Validators.required),
    'sobreTienda': new FormControl('', Validators.required),
    'direccionTienda': new FormControl('', Validators.required),
    'emailTienda': new FormControl('', [Validators.required, Validators.email]),
  });

  crearTienda(){
    if(this.infoForm.valid){
      this.tienda.name = this.infoForm.value.nombreTienda ?? undefined;
      this.tienda.about = this.infoForm.value.sobreTienda?? undefined;
      this.tienda.email = this.infoForm.value.emailTienda?? undefined;
      this.tienda.shopAdress = this.infoForm.value.direccionTienda?? undefined;
      this.tiendaServicio.createTienda(this.tienda).subscribe(
        res=>{
          this.mostrarCartel();
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
}
