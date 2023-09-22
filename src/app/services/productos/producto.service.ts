import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Producto } from 'src/app/Interfaces/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  constructor(private http:HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>('http://localhost:3000/api/products').pipe(
      catchError(this.handleError<Producto[]>('getHeroes', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}
