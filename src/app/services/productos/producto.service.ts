import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/Interfaces/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  constructor(private http:HttpClient) { }

  getProductos(): Observable<Iterable<Producto>> {
    this.http.get('http://localhost:3000/api/productos'); //paginado
    throw new Error('Method not implemented.');
  }

}
