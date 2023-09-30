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
  private isAuthenticated = true;

  estaAutentificado(): boolean {
    return this.isAuthenticated;
  }
  private conseguirToken() {
    if (!this.token) {
      this.token = localStorage.getItem('ACCESS_TOKEN')!;
    }
    return this.token;
  }

  private guardarToken(token: string) {
    localStorage.setItem('ACCESS_TOKEN', token);
    this.token = token;
  }
  logout(){
    this.token='';
    localStorage.removeItem("ACCESS_TOKEN");
    this.isAuthenticated = false;
  }




  login(user: Usuario): Observable<Usuario> {
    this.isAuthenticated = true;
    /* console.log(user); */
    return this.http
      .post<Usuario>(this.apiUrl+ 'api/login', user)
      .pipe(
        tap((res: any) => {
          if (res) {
            //guardar token
            this.guardarToken(res.accessToken);
            
            console.log(this.conseguirToken());
          }
        })
      );
  }

  register(user: Usuario): Observable<Usuario> {
    console.log(user);
    return this.http
      .post<Usuario>(this.apiUrl+ 'api/user', user)
      .pipe(
        tap((res: any) => {
          if (res) {
            //guardar token
            this.guardarToken(res.accessToken);
            console.log(this.conseguirToken());
          }
        })
      );
  }

  getUsuarioByToken(): Observable<Usuario> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
      })
    };

    return this.http.get<any>(this.apiUrl + 'api/userbytoken', httpOptions).pipe(
     map(response => response.data)
    );
  }
 

  updateUsuario(data: Usuario): Observable<Usuario>{
    const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
    })
    };
    return this.http.put<{data: Usuario}>(this.apiUrl + 'api/user-info', data, httpOptions).pipe(
     map(response => response.data)
    );
  }
  updatePass(user: Usuario): Observable<Usuario>{
    const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
    })
    };
    return this.http.put<{user: Usuario}>(this.apiUrl + 'api/user-password', user, httpOptions).pipe(
     map(response => response.user)
    );
  }
}
