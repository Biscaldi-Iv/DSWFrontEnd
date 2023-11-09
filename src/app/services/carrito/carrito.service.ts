import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Carrito } from 'src/app/Interfaces/Carrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private http: HttpClient) { }
  apiUrl = environment.apiUrl;

  create():Carrito {
    let carr: Carrito = { 'apertura': new Date(), 'productos': [] };
    localStorage.setItem('carrito', JSON.stringify(carr));
    return carr;
  }

  comprar(compra: { productos: [{ producto: string, cantidad: number, precio: number }] }): Observable<{ message: string }> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
      })
    };
    return this.http.post<{ message: string }>(this.apiUrl + 'api/comprar', compra, httpOptions);
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

  delete() {
    localStorage.removeItem('carrito');
  }
}
