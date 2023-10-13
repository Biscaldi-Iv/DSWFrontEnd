import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/app/Components/environments/environment';
import { Categoria } from 'src/app/Interfaces/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  get(): Observable<Categoria[]>{
    return this.http.get<{ data: Categoria[] }>(this.apiUrl + 'api/categorias').pipe(
      map(response => response.data)
    );
  }
}
