import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  apiUrl = environment.apiUrl;

   isAuthenticated(): Observable<boolean> {
     // Solicita validacion de token a backend
     let r = false;
     return this.http.get<{ estado: string }>(this.apiUrl + 'api/validar').pipe(map(
       (res: { estado: any; }) => res.estado =='valido'
     ));
   }

  getRole(){
    return this.http.get<any>(this.apiUrl+'api/user/role')
  }
}
