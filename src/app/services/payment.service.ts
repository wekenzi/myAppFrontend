import { Injectable } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Payment } from 'src/app/classes/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends ServiceService <Payment>{
  RouteName='payments';
}
