import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Freelancer } from 'src/app/classes/freelancer';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private subject = new BehaviorSubject<Freelancer[]>([]);

  freelancers$:Observable<Freelancer[]> = this.subject.asObservable();

   
}
