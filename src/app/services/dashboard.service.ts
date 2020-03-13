import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from 'src/app/globals';
import { Dashboard } from 'src/app/classes/dashboard';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(public http:HttpClient) { }
  GetDashboardData():Observable<Dashboard>{
    return this.http.get<Dashboard>(Globals.Url+ 'api/dashboard')
  }

}
