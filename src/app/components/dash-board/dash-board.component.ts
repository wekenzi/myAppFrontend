import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private dashboardService:DashboardService) { }

  loadingOverlay=true;
  firstSectionData=[
    {text:'Freelancers', count:0, icon:'group', background:'#26c6da'},
    {text:'Projects', count:0, icon:'content_paste', background:'#fc4b6c'},
    {text:'Payments', count:0, icon:'monetization_on', background:'#3f51b5'},
    {text:'Currencies', count:0, icon:'alarm', background:'#ffb22b'},
  ];


  ngOnInit() {
    this.dashboardService.GetDashboardData()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
      console.log(data);
      this.firstSectionData[0].count = data.freelancers;
      this.firstSectionData[1].count = data.projects;
      this.firstSectionData[2].count = data.payments;
      this.firstSectionData[3].count = data.currencies;
      this.loadingOverlay = false;
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
