import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }

   isAuthenticated(): boolean {
    const token = sessionStorage.getItem('ACCESS_TOKEN'); // Obtén el token del almacenamiento local
    console.log('token')
    console.log(!!token)
    // Realiza la lógica de verificación aquí
    return !!token; // Devuelve true si el token existe, de lo contrario, false
  }
  getRole(){
    const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
      })
    };
    return this.http.get<any>('http://localhost:3000/api/user/role', httpOptions)
  }
}
