import { Injectable } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Appellation } from 'src/app/classes/appellation';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Globals } from 'src/app/globals';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService extends ServiceService <Appellation>{
  RouteName='currencies';
  CurrenciesList;

  GetCurrenciesList():Observable<any[]>{
    if(this.CurrenciesList == null){
      return this.http.get<any[]>(Globals.Url+ 'api/' + this.RouteName).pipe(
        map(x => this.CurrenciesList = x)
      )
    }else{
      return of(this.CurrenciesList)
    }
    
  }

}
