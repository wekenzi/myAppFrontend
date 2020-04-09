import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Globals } from 'src/app/globals';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailConfirmService {
  constructor(public http:HttpClient) { }

  ConfirmEmail(verifyToken,email):Observable<any>{
    return this.http.get<any>(Globals.Url+ `api/validate/${verifyToken}/${email}`)
  }

}
