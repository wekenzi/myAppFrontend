import { Injectable, Injector } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private inj: Injector) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = this.inj.get(AuthService);
 if(localStorage.getItem('token') != null || sessionStorage.getItem('token') != null) 
    {
      
    const token =  auth.GetToken();
    let httpHeaders = new HttpHeaders()
    .set('Content-Type','application/json')
    .set('Authorization',`Bearer ${token}`)
    const AuthRequest = request.clone({
      headers:httpHeaders
    });
      return next.handle(AuthRequest)
    }else {
      return next.handle(request);
    }
  }
}