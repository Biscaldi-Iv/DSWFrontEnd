import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/app/Components/environments/environment';
import { Producto } from 'src/app/Interfaces/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  apiUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<{products:Producto[]}>(this.apiUrl+'api/products').pipe(
      map(response => response.products)
    );
  }
  crearProducto(producto:Producto, imagenes: FileList){
    const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
    })
    };

    const formData = new FormData();
    formData.append('categoria', producto.categoria ?? '');
    formData.append('nombre', producto.nombre ?? '');
    formData.append('descripcion', producto.descripcion ?? '');
    formData.append('precio', (producto.precio ?? 0).toString());
    formData.append('stock', (producto.precio ?? 0).toString());
    if(imagenes){
      for (let i = 0; i < imagenes.length; i++) {
        formData.append('fotos', imagenes[i]);
      }
    }
    console.log(formData.get('fotos'))

    return this.http.post(this.apiUrl+'api/create-product', formData, httpOptions)
  }
  
}


