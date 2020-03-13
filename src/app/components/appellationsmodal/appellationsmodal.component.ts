import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material';
import { Appellation } from 'src/app/classes/appellation';
import { NationalityService } from 'src/app/services/nationality.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-appellationsmodal',
  templateUrl: './appellationsmodal.component.html',
  styleUrls: ['./appellationsmodal.component.css']
})
export class AppellationsmodalComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData:any,
    private appellationModal:MatDialogRef<AppellationsmodalComponent>,
    private nationalityService:NationalityService,
    private currencyService:CurrencyService,
  ) { }
    loadingOverlay = false;
    nameError = false;
    currentAppellation:Appellation = this.injectedData.appellation;
  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

  cancel(){
    this.appellationModal.close(null);
  }
  
  save(){
    if(!this.currentAppellation.name){this.nameError=true;}else{this.nameError=false;}
    if(this.nameError == false){   
      this.loadingOverlay = true;
      if(this.injectedData._id == null){
        if(this.injectedData.index == 0){
          this.nationalityService.Add(this.currentAppellation)
          .pipe(takeUntil(this.destroy$))
          .subscribe(data=>{
            console.log(data)
            this.appellationModal.close(data);
            this.loadingOverlay = false;
          })
        }else if(this.injectedData.index == 1){
          this.currencyService.Add(this.currentAppellation)
          .pipe(takeUntil(this.destroy$))
          .subscribe(data=>{
            console.log(data)
            this.appellationModal.close(data);
            this.loadingOverlay = false;
          })
        }

      }else{
        if(this.injectedData.index == 0){
          this.nationalityService.Edit(this.currentAppellation,this.injectedData._id)
          .pipe(takeUntil(this.destroy$))
          .subscribe(data=>{
            console.log(data)
            this.appellationModal.close(data);
            this.loadingOverlay = false;
          })
        }else if(this.injectedData.index == 1){
          this.currencyService.Edit(this.currentAppellation,this.injectedData._id)
          .pipe(takeUntil(this.destroy$))
          .subscribe(data=>{
            console.log(data)
            this.appellationModal.close(data);
            this.loadingOverlay = false;
          })
        }
      }
    }
  }

}
