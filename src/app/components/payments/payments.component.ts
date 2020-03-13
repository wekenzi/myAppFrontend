import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FreelancersmodalComponent } from 'src/app/components/freelancersmodal/freelancersmodal.component';
import { Payment } from 'src/app/classes/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { DeletemodalComponent } from 'src/app/components/deletemodal/deletemodal.component';
import { ToastrService } from 'ngx-toastr';
import { Lookup } from 'src/app/classes/lookup';
import { CurrencyService } from 'src/app/services/currency.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private freelancerModal:MatDialog,
    private deleteModal:MatDialog,
    private paymentService:PaymentService,
    private toastr: ToastrService,
    private currencyService:CurrencyService,
    ) { }

  payments=[];
  currenciesList:Lookup[]=[];
  loadingOverlay=true;
  listShow=true;
  currentPayment = new Payment;
  searchFilter='';
  
  // Form Validators
  nameError=false;
  dateError=false;
  valueError=false;
  freelancersError=false;
  currencyError=false;
  // ============

  ngOnInit() {
    this.paymentService.GetList()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
      console.log(data);
      this.payments = data;
      this.loadingOverlay = false;
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

  // Add Shift
  addPayment(){
    this.currentPayment = new Payment;
    this.nameError=false;
    this.dateError=false;
    this.valueError=false;
    this.freelancersError=false;
    this.listShow = false;
    this.currencyError=false;
  }

  // Back To List
  backToList(){
    this.currentPayment = new Payment;
    this.listShow = true;
  }

  // Employees Modal 
  openFreelancersModal(){
    let matDialog = new MatDialogConfig();
    matDialog.disableClose = true;
    matDialog.width="90%";
    matDialog.maxWidth="90%";
    matDialog.data=this.currentPayment.freelancers;
    this.freelancerModal.open(FreelancersmodalComponent,matDialog)
    .afterClosed().subscribe(res=>{
      if(res == null || res == undefined){
        return false
      }else{
        while (this.currentPayment.freelancers.length > 0) {
          this.currentPayment.freelancers.pop();
        }
        if(res.length == 0){
          this.freelancersError = true;
        }else{
          this.freelancersError = false;
          this.currentPayment.freelancers = res.map(emp => emp._id);
        }
        
        console.log(res);
      }
    });
  }

  //Submit Shift
  submitPayment(){
    if(!this.currentPayment.name){this.nameError = true;}else{this.nameError = false;}
    if(!this.currentPayment.date){this.dateError = true;}else{this.dateError = false;}
    if(!this.currentPayment.value){this.valueError = true;}else{this.valueError = false;}
    if(!this.currentPayment.currency){this.currencyError = true;}else{this.currencyError = false;}
    if(this.currentPayment.freelancers.length == 0){this.freelancersError = true;}else{this.freelancersError = false;}
    if(this.nameError == false&&this.dateError == false&&this.valueError == false&&this.freelancersError == false&&this.currencyError == false){
      this.loadingOverlay = true;
      if(this.currentPayment._id != null){
        this.paymentService.Edit(this.currentPayment,this.currentPayment._id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data:any)=>{
          console.log(data);
          this.payments.forEach(payment=> {
            if(data._id == payment._id){
             payment.name = data.name;
             payment.value = data.value;   
             payment.date = data.date;
             payment.currency = data.currency;
             payment.freelancers = data.freelancers;
            }
          });
          this.loadingOverlay = false;
          this.toastr.success('Payment has been edited', 'Success');
          this.backToList();
        },err=>{
          console.log(err);
          this.toastr.error(err.error.message, 'Failed');
        })
      }else{
        this.paymentService.Add(this.currentPayment)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data:any)=>{
          console.log(data);
          this.payments.unshift(data);
          this.loadingOverlay = false;
          this.toastr.success('Payment has been added', 'Success');
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
    this.paymentService.Get(_id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      this.currentPayment = data;
      this.loadingOverlay = false;
      this.listShow = false;
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
        this.paymentService.Delete(_id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data:any)=>{
          this.payments.forEach(payment => {
            if(data._id == payment._id){
              this.payments.splice(this.payments.indexOf(payment), 1);
            }
          });
          this.loadingOverlay = false;
          this.toastr.success('Payment has been deleted', 'Success');
        },err=>{
          console.log(err);
          this.toastr.error(err.error.message, 'Failed');
        })        
      }
    });
  }

}
