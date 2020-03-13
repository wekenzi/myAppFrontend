import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material';
import { FreelancerService } from 'src/app/services/freelancer.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { Lookup } from 'src/app/classes/lookup';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-freelancersmodal',
  templateUrl: './freelancersmodal.component.html',
  styleUrls: ['./freelancersmodal.component.css']
})
export class FreelancersmodalComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData: any,
    private freelancerModal:MatDialogRef<FreelancersmodalComponent>,
    private freelancerService:FreelancerService,
    private currencyService:CurrencyService,
  ) { }
  
  freelancersList:EmpModalList[]=[];
  currenciesList:Lookup[]=[];
  searchFilter='';

  ngOnInit() {
    this.freelancerService.GetFreelancersList()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
      console.log(data);
      this.freelancersList = data;
      this.freelancersList.forEach(freelancer => {
        this.injectedData.forEach(injectedID => {
          if(freelancer._id == injectedID){
            freelancer.status = true;
          }
        });
      })
    })

    this.currencyService.GetCurrenciesList()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
      console.log(data);
      this.currenciesList = data;
    })

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

  getCurrencyName(id){
    let cur = this.currenciesList.find(x=>x._id == id);
    return cur.name;
  }

  resetFreelancersList(){
    this.freelancersList.map(x=>{
      x.status = false;
    })
  }

  getTotalSelected(){
    if(this.freelancersList.length > 0){
      return this.freelancersList.filter(x=>{ return x.status == true}).length
    }
  }

  cancel(){
    this.freelancerModal.close(null);
    this.resetFreelancersList();
  }
  
  assign(){
    let arr = this.freelancersList.filter(x=>{ return x.status == true})
    this.freelancerModal.close(arr);
    this.resetFreelancersList();
  }

}
export class EmpModalList{
  _id:String;
  name:String;
  job:String;
  payslip:Number;
  currency:String
  status=false;
}
