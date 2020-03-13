import { Component, OnInit, ViewChild, HostListener} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NationalityService } from 'src/app/services/nationality.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { FreelancerService } from 'src/app/services/freelancer.service';
import { ProfilemodalComponent } from 'src/app/components/profilemodal/profilemodal.component';
import {Router} from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.css']
})
export class MainBoardComponent implements OnInit {
  constructor(
    private auth:AuthService,
    private router:Router,
    private freelancerService:FreelancerService,
    private nationalityService:NationalityService,
    private currencyService:CurrencyService,
    private profileModal:MatDialog,
  ) { }

  sideRoutes=[
    {id:1, name:'Dashboard', routerLink:'/m/dashboard', routerLinkActive:'active', icon:'av_timer'},
    {id:2, name:'Projects', routerLink:'/m/projects', routerLinkActive:'active', icon:'assignment'},
    {id:3, name:'Freelancers', routerLink:'/m/freelancers', routerLinkActive:'active', icon:'group'},
    {id:4, name:'Payments', routerLink:'/m/payments', routerLinkActive:'active', icon:'account_balance_wallet'},
    {id:5, name:'Appellations', routerLink:'/m/appellations', routerLinkActive:'active', icon:'description'},
  ];
  lang = localStorage.getItem('lang');

  ngOnInit() {
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isLargeScreen()
  }

  isLargeScreen() {
    if (window.innerWidth > 767) {
        return true;
    } else {
        return false;
    }
  }

  langIsArabic(){
    if(this.lang == 'ar'){
      return true;
    }else{
      return false;
    }
  }

  editProfile(){
    let matDialog = new MatDialogConfig();
    matDialog.disableClose = true;
    matDialog.maxWidth="350px";
    this.profileModal.open(ProfilemodalComponent,matDialog)
    .afterClosed().subscribe(res=>{
      if(res == null || res == undefined){
        return false
      }else{
        console.log(res);
      }
    });
  }

  logout(){
    this.auth.Logout();
    this.router.navigate(['login']);
    this.freelancerService.FreelancersList = null;
    this.nationalityService.NationalitiesList = null;
    this.currencyService.CurrenciesList = null;
  }

}
