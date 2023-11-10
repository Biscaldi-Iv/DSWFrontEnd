import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tienda } from 'src/app/Interfaces/Tienda';
import { TiendaService } from 'src/app/services/tiendas/tienda.service';

@Component({
  selector: 'app-info-tienda',
  templateUrl: './info-tienda.component.html',
  styleUrls: ['./info-tienda.component.css']
})
export class InfoTiendaComponent {
  constructor(private tiendaServicio: TiendaService){

  }
  tienda: Tienda = { name: '', about: '', email:'' , shopAdress: '' };
  infoForm= new FormGroup({
    'name': new FormControl('', Validators.required),
    'about': new FormControl('', Validators.required),
    'shopAdress': new FormControl('', Validators.required),
    'email': new FormControl('', [Validators.required, Validators.email]),

  });

  guardarCambios(){
    if(this.infoForm.valid){
      if(this.infoForm.valid){
      this.tienda.name = this.infoForm.value.name ?? undefined;
      this.tienda.about = this.infoForm.value.about?? undefined;
      this.tienda.email = this.infoForm.value.email?? undefined;
      this.tienda.shopAdress = this.infoForm.value.shopAdress?? undefined;
      this.tiendaServicio.updateTienda(this.tienda).subscribe(
        res=>{
          this.mostrarCartel();
          console.log(res);
          }
        )
      }
    }
  }

  eliminarTienda(){
    this.tiendaServicio.deleteTienda().subscribe(
      res=>{
        console.log(res)
        console.log('tienda eliminada')
      }
    )
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
