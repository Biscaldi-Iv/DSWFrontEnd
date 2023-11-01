import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, map, tap } from 'rxjs';
import { Usuario } from 'src/app/Interfaces/Usuario';
import { environment } from '../../Components/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}
  apiUrl = environment.apiUrl;
  private token!: string;

  estaAutentificado(): boolean {
    return !!sessionStorage.getItem('ACCESS_TOKEN');
  }
  private conseguirToken() {
    if (!this.token) {
      this.token = sessionStorage.getItem('ACCESS_TOKEN')!;
    }
    return this.token;
  }

  guardarToken(token: string) {
    sessionStorage.setItem('ACCESS_TOKEN', token);
    this.token = token;
  }
  logout(){
    this.token='';
    sessionStorage.removeItem("ACCESS_TOKEN");
  }




  login(user: Usuario): Observable<{accessToken?:string,message?:string}> {
    this.isAuthenticated = true;
    return this.http
      .post<{ accessToken?: string, message: string }>(this.apiUrl + 'api/login', user);
  }

  register(user: Usuario): Observable<Usuario> {
    this.isAuthenticated = true;
    console.log(user);
    return this.http
      .post<Usuario>(this.apiUrl + 'api/user', user).pipe(
        map(res => res)
      );
  }

  getUsuarioByToken(): Observable<Usuario> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
      })
    };

    return this.http.get<any>(this.apiUrl + 'api/userbytoken', httpOptions).pipe(
     map(response => response.data)
    );
  }


  updateUsuario(data: Usuario): Observable<Usuario>{
    const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
    })
    };
    return this.http.put<{data: Usuario}>(this.apiUrl + 'api/user-info', data, httpOptions).pipe(
     map(response => response.data)
    );
  }
  updatePass(user: Usuario): Observable<Usuario>{
    const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
    })
    };
    return this.http.put<{user: Usuario}>(this.apiUrl + 'api/user-password', user, httpOptions).pipe(
     map(response => response.user)
    );
  }

  deleteUser(){
    const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
      })
    }
    return this.http.delete<any>(this.apiUrl + 'api/user', httpOptions).pipe(
        map(res => res)
      );
  }
}
