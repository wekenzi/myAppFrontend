import { Injectable } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Profile } from 'src/app/classes/profile';
import { Globals } from 'src/app/globals';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends ServiceService <Profile>{
  RouteName='clients';

  Update(Dto){
    return this.http.put(Globals.Url+ 'api/' + this.RouteName ,JSON.stringify(Dto))
  }

}
