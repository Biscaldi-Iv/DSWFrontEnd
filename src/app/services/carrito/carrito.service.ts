import { Injectable } from '@angular/core';
import { Carrito } from 'src/app/Interfaces/Carrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor() { }

  create():Carrito {
    let carr: Carrito = { 'apertura': new Date(), 'productos': [] };
    localStorage.setItem('carrito', JSON.stringify(carr));
    return carr;
  }

  /**
   * Devuelve el carrito actual almacenado, y si no existe
   * crea uno nuevo
   *
   * @returns Carrito
   */
  get(): Carrito {
    const str = localStorage.getItem('carrito');
    if (!str) {
      return this.create();
    }
    let carr: Carrito = JSON.parse(str);
    return carr;
  }

  /**
   * Guarda los cambios en el carrito de compras
   * @param carr : lista modificada con items nuevos o modificacion en la cantidad
   *
   */
  save(carr: Carrito) {
    localStorage.setItem('carrito', JSON.stringify(carr));
  }
}
