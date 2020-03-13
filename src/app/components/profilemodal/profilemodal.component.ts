import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/classes/profile';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-profilemodal',
  templateUrl: './profilemodal.component.html',
  styleUrls: ['./profilemodal.component.css']
})
export class ProfilemodalComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData:any,
    private profileModal:MatDialogRef<ProfilemodalComponent>,
    private registerFormBuilder:FormBuilder,
    private profileService:ProfileService,
    private toastr: ToastrService,
  ) { }

  loadingOverlay = true;
  registerForm: FormGroup;
  get r() { return this.registerForm.controls; }

  ngOnInit() {
    this.registerForm = this.registerFormBuilder.group({
      regEmail: ['', [Validators.required, Validators.email, Validators.pattern(/^((?!\s{2,}).)*$/)]],
      regName: ['', [Validators.required, Validators.pattern(/^((?!\s{2,}).)*$/)]]
    });

    this.profileService.GetList()
    .pipe(
      map(res=> {return res[0]}),
      takeUntil(this.destroy$)
    )
    .subscribe((data:Profile)=>{
      this.registerForm.setValue({
        regEmail:data.email,
        regName:data.name
      })
      this.loadingOverlay = false;
    })

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

  cancel(){
    this.profileModal.close(null);
    this.registerForm.reset();
  }

  onSubmit(){
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    this.loadingOverlay = true;
    let profile = new Profile()
    profile.name = this.registerForm.get('regName').value;
    profile.email = this.registerForm.get('regEmail').value;
    this.profileService.Update(profile)
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
      this.toastr.success('Profile has been updated', 'Success');
      this.loadingOverlay = false;
      this.profileModal.close(null);
    },err=>{
      console.log(err);
      this.toastr.error(err.error.message, 'Failed');
    })
    
  }

}
