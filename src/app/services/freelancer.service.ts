import { Injectable } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Freelancer } from 'src/app/classes/freelancer';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Globals } from 'src/app/globals';

@Injectable({
  providedIn: 'root'
})
export class FreelancerService extends ServiceService <Freelancer>{
  RouteName='freelancers';
  FreelancersList;
  
  GetFreelancersList():Observable<any[]>{
    if(this.FreelancersList == null){
      return this.http.get<any[]>(Globals.Url+ 'api/' + this.RouteName).pipe(
        map(x => this.FreelancersList = x)
      )
    }else{
      return of(this.FreelancersList)
    }
    
  }

}
