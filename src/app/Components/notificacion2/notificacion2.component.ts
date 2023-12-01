import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notificacion2',
  templateUrl: './notificacion2.component.html',
  styleUrls: ['./notificacion2.component.css']
})
export class Notificacion2Component {
  @Input() mensaje: string = '';

  notificar(b:boolean=true) {
    const successMessage = document.getElementById('successMessage');
    const msgcolor=document.getElementById('msgcolor')
    if (successMessage && msgcolor) {
      // Mostrar el cartel
      successMessage.classList.remove('hidden');
      if (!b) {
        msgcolor.classList.replace('bg-green-500', 'bg-red-500');
      }

      // Ocultar el cartel después de 2 segundos
      setTimeout(() => {
        successMessage.classList.add('hidden');
        if (!b) {
        msgcolor.classList.replace('bg-red-500', 'bg-green-500');
      }
      }, 2000);
    }
  }

}
