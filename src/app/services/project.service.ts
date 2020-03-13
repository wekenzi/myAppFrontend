import { Injectable } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Project } from 'src/app/classes/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends ServiceService <Project>{
  RouteName='projects';
}
