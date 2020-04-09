import { Component, OnInit } from '@angular/core';
import { EmailConfirmService } from 'src/app/services/email-confirm.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-email-confirm',
  templateUrl: './email-confirm.component.html',
  styleUrls: ['./email-confirm.component.css']
})
export class EmailConfirmComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private emailConfirmService:EmailConfirmService,
    private route: ActivatedRoute,
    private router:Router
    ) { }

  loadingOverlay=true;
  token:string;
  email:string;
  success = false;
  failed = false;

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get("token")
    this.email = this.route.snapshot.paramMap.get("email")
    this.emailConfirmService.ConfirmEmail(this.token,this.email)
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
      console.log(data);
      this.loadingOverlay = false;
      this.success = true;
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 4000);
    },err=>{
      console.log(err);
      this.loadingOverlay = false;
      this.failed = true;
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
