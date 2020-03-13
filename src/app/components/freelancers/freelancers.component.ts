import { Component, OnInit } from '@angular/core';
import { Freelancer } from 'src/app/classes/freelancer';
import { NationalityService } from 'src/app/services/nationality.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { DeletemodalComponent } from 'src/app/components/deletemodal/deletemodal.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FreelancerService } from 'src/app/services/freelancer.service';
import { Lookup } from 'src/app/classes/lookup';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-freelancers',
  templateUrl: './freelancers.component.html',
  styleUrls: ['./freelancers.component.css']
})
export class FreelancersComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private deleteModal:MatDialog,
    private freelancerService:FreelancerService,
    private toastr: ToastrService,
    private nationalityService:NationalityService,
    private currencyService:CurrencyService,
  ) { }
  freelancers=[];
  nationalitiesList:Lookup[]=[];
  currenciesList:Lookup[]=[];



  loadingOverlay=true;

  listShow=true;
  currentFreelancer = new Freelancer;
  searchFilter='';

  // Form Validators
  nameError=false;
  genderError=false;
  payslipError=false;
  jobError=false;
  currencyError=false;
  HPDError=false;
  workingDaysError=false;
  
  // ============

  ngOnInit() {

    this.freelancerService.GetFreelancersList()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
      console.log(data);
      this.freelancers = data;
      this.loadingOverlay = false;
    })

    this.nationalityService.GetNationalitiesList()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
      console.log(data);
      this.nationalitiesList = data;
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

  onlyNumbers(event){
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;  
  }

  onlyArrows(event){
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 40 || charCode != 38) {
      return false;
    }
    return true;  
  }

  onlyNumbersWithDecimal(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 
      && (charCode < 48 || charCode > 57))
       return false;

    return true;  
  }

  getCurrencyName(id){
    let cur = this.currenciesList.find(x=>x._id == id);
    return cur.name;
  }

  // Add Freelancer
  addFreelancer(){
    this.currentFreelancer = new Freelancer;
    this.nameError=false;
    this.genderError=false;
    this.payslipError=false;
    this.jobError=false;
    this.currencyError=false;
    this.HPDError=false;
    this.workingDaysError=false;
    this.listShow = false;
  }

  // Back To List
  backToList(){
    this.currentFreelancer = new Freelancer;
    this.listShow = true;
  }

  //Submit Shift
  submitFreelancer(){
    if(!this.currentFreelancer.name){this.nameError = true;}else{this.nameError = false;}
    if(!this.currentFreelancer.gender){this.genderError = true;}else{this.genderError = false;}
    if(!this.currentFreelancer.job){this.jobError = true;}else{this.jobError = false;}
    if(!this.currentFreelancer.payslip){this.payslipError = true;}else{this.payslipError = false;}
    if(!this.currentFreelancer.currency){this.currencyError = true;}else{this.currencyError = false;}
    if(!this.currentFreelancer.HPD || this.currentFreelancer.HPD == 0){this.HPDError = true;}else{this.HPDError = false;}
    if(!this.currentFreelancer.workingDays || this.currentFreelancer.workingDays == 0){this.workingDaysError = true;}else{this.workingDaysError = false;}
    if(this.nameError == false&&this.genderError == false&&this.jobError == false&&this.payslipError == false&&this.currencyError == false&&this.HPDError == false&&this.workingDaysError == false){
      console.log(this.currentFreelancer);
      this.loadingOverlay = true;
      if(!this.currentFreelancer._id){
        this.freelancerService.Add(this.currentFreelancer)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data:any)=>{
          this.loadingOverlay = false;
          this.freelancers.unshift(data);
          this.toastr.success('Freelancer has been added', 'Success');
          this.backToList();
        },err=>{
          console.log(err);
          this.toastr.error(err.error.message, 'Failed');
        })
      }else{
        this.freelancerService.Edit(this.currentFreelancer,this.currentFreelancer._id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data:any)=>{
          this.freelancers.forEach(freelancer => {
            if(freelancer._id == data._id){
              freelancer.name = data.name;
              freelancer.job = data.job;
              freelancer.payslip = data.payslip;
              freelancer.currency = data.currency;
            }
          });
          this.loadingOverlay = false;
          this.toastr.success('Freelancer has been edited', 'Success');
          this.backToList();
        },err=>{
          console.log(err);
          this.toastr.error(err.error.message, 'Failed');
        })
      }
      
    }
  }

  editItem(_id){
    this.loadingOverlay = true;
    this.addFreelancer();
    this.freelancerService.Get(_id)
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
      console.log(data);
      this.currentFreelancer = data;
      this.loadingOverlay = false;
    })
  }

  deleteItem(_id){
    let matDialog = new MatDialogConfig();
    matDialog.disableClose = true;
    matDialog.maxWidth="350px";
    this.deleteModal.open(DeletemodalComponent,matDialog)
    .afterClosed().subscribe(res=>{
      if(res == null || res == undefined){
        return false
      }else{
        this.loadingOverlay = true;
        this.freelancerService.Delete(_id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data:any)=>{
          this.freelancers.forEach(freelancer => {
            if(data._id == freelancer._id){
              this.freelancers.splice(this.freelancers.indexOf(freelancer), 1);
            }
          });
          this.loadingOverlay = false;
          this.toastr.success('Freelancer has been deleted', 'Success');
        },err=>{
          console.log(err);
          this.toastr.error(err.error.message, 'Failed');
        })        
      }
    });
  }


}
