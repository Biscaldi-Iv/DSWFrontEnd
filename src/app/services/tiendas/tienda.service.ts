import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from 'src/app/Interfaces/Producto';
import { Tienda } from 'src/app/Interfaces/Tienda';
import { UsuarioService } from '../usuarios/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  constructor(private http: HttpClient, private usuarioService: UsuarioService) { }
  apiUrl = environment.apiUrl;

  createTienda(tienda: Tienda): Observable<Tienda> {
    return this.http
      .post<Tienda>(this.apiUrl+ '/create-tienda', tienda)
      .pipe(
        tap((res: any) => {
          if (res) {
            //guardar token
            this.usuarioService.guardarToken(res.token);
          }
        })
      );
  }

  updateTienda(data: Tienda): Observable<Tienda>{
    return this.http.put<{shop: Tienda}>(this.apiUrl + 'api/update-tienda', data).pipe(
     map(response => response.shop)
    );
  }
  deleteTienda(){
    return this.http.delete<any>(this.apiUrl + 'api/tienda').pipe(
     tap((res: any) => {
          if (res) {
            //guardar token
            sessionStorage.setItem('ACCESS_TOKEN', res.token);
          }
        })
    );
  }
  getProductosTienda(id: string){
    console.log(this.apiUrl+'api/productsbyshop/'+id)
    return this.http.get<{data:Producto[]}>(this.apiUrl+'api/productsbyshop/'+id).pipe(
      map(response => response.data)
    );
  }
}
