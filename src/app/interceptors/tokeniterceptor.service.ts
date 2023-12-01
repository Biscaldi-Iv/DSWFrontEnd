import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokeniterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const TOKEN = sessionStorage.getItem("ACCESS_TOKEN");
    if (TOKEN) {
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${TOKEN}`)
      });
    }
    return next.handle(req);
  }
}
