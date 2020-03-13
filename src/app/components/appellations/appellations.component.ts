import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AppellationsmodalComponent } from 'src/app/components/appellationsmodal/appellationsmodal.component';
import { DeletemodalComponent } from 'src/app/components/deletemodal/deletemodal.component';
import { Appellation } from 'src/app/classes/appellation';
import { NationalityService } from 'src/app/services/nationality.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-appellations',
  templateUrl: './appellations.component.html',
  styleUrls: ['./appellations.component.css']
})
export class AppellationsComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private appellationModal:MatDialog,
    private deleteModal:MatDialog,
    private nationalityService:NationalityService,
    private currencyService:CurrencyService,
    ) { }

  // Tabs
  tabs=[
    {text:'Nationalities',active:true},
    {text:'Currencies',active:false}
  ];

  nationalities:Appellation[];
  currencies:Appellation[];

  loadingOverlay=true;


  ngOnInit() {
    
    this.nationalityService.GetNationalitiesList()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
      this.nationalities=data;
      this.loadingOverlay=false;
    })

    this.currencyService.GetCurrenciesList()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
      this.currencies=data;
      this.loadingOverlay=false;
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

  tabChange(i){
    this.tabs.map(x=>{x.active=false});
    this.tabs[i].active=true;
  }

  addNew(i){
    let matDialog = new MatDialogConfig();
    matDialog.disableClose = true;
    matDialog.maxWidth="350px";
    matDialog.data = {
      index:i, _id:null, appellation:{
        name:null,
        desc:null
      }
    };
    this.appellationModal.open(AppellationsmodalComponent,matDialog)
    .afterClosed().subscribe(res=>{
      if(res == null || res == undefined){
        return false
      }else{
        console.log(res);
        if(i == 0){this.nationalities.unshift(res);}
        if(i == 1){this.currencies.unshift(res);}
      }
    });

  }

  editNationality(obj,index){
    let matDialog = new MatDialogConfig();
    matDialog.disableClose = true;
    matDialog.maxWidth="350px";
    matDialog.data = {
      index:0, _id:obj._id, appellation:{
        name:obj.name,
        desc:obj.desc
      }
    };
    this.appellationModal.open(AppellationsmodalComponent,matDialog)
    .afterClosed().subscribe(res=>{
      if(res == null || res == undefined){
        return false
      }else{
        console.log(res);
        this.nationalities[index].name = res.name;
        this.nationalities[index].desc = res.desc;
      }
    });
  }

  editCurrency(obj,index){
    let matDialog = new MatDialogConfig();
    matDialog.disableClose = true;
    matDialog.maxWidth="350px";
    matDialog.data = {
      index:1, _id:obj._id, appellation:{
        name:obj.name,
        desc:obj.desc
      }
    };
    this.appellationModal.open(AppellationsmodalComponent,matDialog)
    .afterClosed().subscribe(res=>{
      if(res == null || res == undefined){
        return false
      }else{
        console.log(res);
        this.currencies[index].name = res.name;
        this.currencies[index].desc = res.desc;
      }
    });
  }

  deleteNationality(_id){
    let matDialog = new MatDialogConfig();
    matDialog.disableClose = true;
    matDialog.maxWidth="350px";
    this.deleteModal.open(DeletemodalComponent,matDialog)
    .afterClosed().subscribe(res=>{
      if(res == null || res == undefined){
        return false
      }else{
        this.loadingOverlay = true;
        this.nationalityService.Delete(_id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data:any)=>{
          this.nationalities.forEach(nationality => {
            if(data._id == nationality._id){
              this.nationalities.splice(this.nationalities.indexOf(nationality), 1);
            }
          });
          this.loadingOverlay = false;
        })        
      }
    });
  }

  deleteCurrency(_id){
    let matDialog = new MatDialogConfig();
    matDialog.disableClose = true;
    matDialog.maxWidth="350px";
    this.deleteModal.open(DeletemodalComponent,matDialog)
    .afterClosed().subscribe(res=>{
      if(res == null || res == undefined){
        return false
      }else{
        this.loadingOverlay = true;
        this.currencyService.Delete(_id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data:any)=>{
          this.currencies.forEach(cur => {
            if(data._id == cur._id){
              this.currencies.splice(this.currencies.indexOf(cur), 1);
            }
          });
          this.loadingOverlay = false;
        })        
      }
    });
  }





}
