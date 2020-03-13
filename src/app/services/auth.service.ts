import { Injectable } from '@angular/core';
import { HttpClient, HttpParams , HttpHeaders } from '@angular/common/http';
import { Globals } from 'src/app/globals';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,public translate: TranslateService) { }

  GetTokenFromServer(email,password):Observable<{}>{
    let body = {
      email:email,
      password:password
    }
    return this.http.post(Globals.Url+'api/login',body)
  }

  Register(name,email,password):Observable<{}>{
    let body = {
      name:name,
      email:email,
      password:password
    }
    return this.http.post(Globals.Url+'api/register',body)
  }

  isLoggedIn() {
    return this.GetToken() !== null;
  }

  Logout(){
    let lang = localStorage.getItem('lang');
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('lang',lang);
  }

  SetTokenToLocalStorage(token){
    localStorage.setItem('token',token)
  }

  SetTokenToSessionStorage(token){
    sessionStorage.setItem('token',token)
  }

  GetToken(){
    if(localStorage.getItem('token')){
      return localStorage.getItem('token');
    }else{
      return sessionStorage.getItem('token');
    }
  }

  RemoveToken(){
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }

}
