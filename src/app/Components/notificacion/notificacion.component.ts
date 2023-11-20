import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent {
  @Input() tipo: string = '';
  @Input() mensaje: string = '';
  @Input() codigo: number=0;
  @Output() hidde: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  cerrar() {
    this.hidde.emit(true);
  }
}
