import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Producto } from 'src/app/Interfaces/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  constructor(private http:HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<{products:Producto[]}>('http://localhost:3000/api/products').pipe(
      map(response => response.products)
    );
  }

  
}


