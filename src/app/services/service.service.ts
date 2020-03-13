import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from 'src/app/globals';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService <Dto>{
  Dtos:Dto[];
  Dto:Dto;
  constructor(public http:HttpClient) { }
  RouteName:String;
  GetList():Observable<any[]>{
    return this.http.get<any[]>(Globals.Url+ 'api/' + this.RouteName)
  }

  Get(_id:String):Observable<any>{
    return this.http.get<any>(Globals.Url+ 'api/' + this.RouteName + '/' + _id)
  }

  Add(Dto:Dto){
    return this.http.post(Globals.Url+ 'api/' + this.RouteName,JSON.stringify(Dto))
  }

  Edit(Dto:Dto,_id:String){
    return this.http.put(Globals.Url+ 'api/' + this.RouteName + '/' + _id,JSON.stringify(Dto))
  }

  Delete(_id:String){
    return this.http.delete(Globals.Url+ 'api/' + this.RouteName + '/' + _id)
  }

}
