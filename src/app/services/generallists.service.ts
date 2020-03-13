import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Globals } from 'src/app/globals';

@Injectable({
  providedIn: 'root'
})
export class GenerallistsService {
  constructor(private http:HttpClient) { }
  NationalitiesList;
  CurrenciesList;

  GetProjectsIdList():Observable<any>{
    return this.http.get<any>(Globals.Url+'api/generalLists/projectsListId') 
  }

  GetNationalitiesIdList():Observable<any>{
    if(this.NationalitiesList == null){
      return this.http.get<any>(Globals.Url+'api/generalLists/nationalitiesListId').pipe(
        map(x => this.NationalitiesList = x)
      )
    }else{
      return of(this.NationalitiesList)
    }
  }

  GetCurrenciesIdList():Observable<any>{
    if(this.CurrenciesList == null){
      return this.http.get<any>(Globals.Url+'api/generalLists/currenciesListId').pipe(
        map(x => this.CurrenciesList = x)
      )
    }else{
      return of(this.CurrenciesList)
    }
  }


}
