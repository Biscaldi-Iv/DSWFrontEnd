import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tienda } from 'src/app/Interfaces/Tienda';
import { TiendaService } from 'src/app/services/tiendas/tienda.service';
import { Notificacion2Component } from '../notificacion2/notificacion2.component';

@Component({
  selector: 'app-crear-tienda',
  templateUrl: './crear-tienda.component.html',
  styleUrls: ['./crear-tienda.component.css']
})
export class CrearTiendaComponent {
  @ViewChild(Notificacion2Component) notifcomp!: Notificacion2Component;

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
          this.notifcomp.notificar();
      });
    }
  }
}
