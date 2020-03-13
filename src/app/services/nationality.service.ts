import { Injectable } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Appellation } from 'src/app/classes/appellation';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Globals } from 'src/app/globals';

@Injectable({
  providedIn: 'root'
})
export class NationalityService extends ServiceService <Appellation>{
  RouteName='nationalities';
  NationalitiesList;

  GetNationalitiesList():Observable<any[]>{
    if(this.NationalitiesList == null){
      return this.http.get<any[]>(Globals.Url+ 'api/' + this.RouteName).pipe(
        map(x => this.NationalitiesList = x)
      )
    }else{
      return of(this.NationalitiesList)
    }
    
  }

}
