import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { Usuario } from 'src/app/Interfaces/Usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  private token!: string;

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

  login(user: Usuario): Observable<Usuario> {
    console.log(user);
    return this.http
      .post<Usuario>('http://localhost:3000/api/' + 'login', user)
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
}
