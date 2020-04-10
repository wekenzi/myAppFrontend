import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {callRtlStyle , removeRtlStyle} from 'src/app/globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { 
  destroy$: Subject<boolean> = new Subject<boolean>();
  showRegister=false;
  selectedLang;
  // Login Things
  loginForm: FormGroup;
  remember=false;
  loadingOverlay=false;

  // Register Things
  registerForm: FormGroup;

  get f() { return this.loginForm.controls; }
  get r() { return this.registerForm.controls; }

  constructor(
    public translate: TranslateService,
    private auth:AuthService,
    private router:Router,
    private loginFormBuilder:FormBuilder, 
    private registerFormBuilder:FormBuilder,
    private toastr: ToastrService,
    ) { }

  ngOnInit() {

    let lang = localStorage.getItem('lang');
    if(!!lang){
      this.selectedLang = lang;
    }else{
      this.selectedLang = 'en';
    }

    this.loginForm = this.loginFormBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^((?!\s{2,}).)*$/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^((?!\s{2,}).)*$/)]]
    });

    this.registerForm = this.registerFormBuilder.group({
      regEmail: ['', [Validators.required, Validators.email, Validators.pattern(/^((?!\s{2,}).)*$/)]],
      regPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^((?!\s{2,}).)*$/)]],
      regName: ['', [Validators.required, Validators.pattern(/^((?!\s{2,}).)*$/)]]
    });
    
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

  langChanged(lang){
    this.translate.use(lang)
    localStorage.setItem('lang',lang);
    document.getElementsByTagName('html')[0].lang=lang;
    if(lang == 'ar'){
      callRtlStyle();
    }else{
      removeRtlStyle();
    }
  }

  showRegisterFunc(){
    this.showRegister = true;
    this.loginForm.reset();
  }

  showLoginFunc(){
    this.showRegister = false;
    this.registerForm.reset();
  }

  onSubmitLogin(){
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    this.loadingOverlay = true;
    this.auth.GetTokenFromServer(this.loginForm.get('email').value,this.loginForm.get('password').value)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      console.log(data);
      if(!this.remember){
        this.auth.SetTokenToSessionStorage(data.token)
      }else{
        this.auth.SetTokenToLocalStorage(data.token)
      }
      
      this.toastr.success('Welcome', 'Success');
      setTimeout(() => {
        this.router.navigate(['/m/dashboard']);
      }, 500);
    },err=>{
      console.log(err);
      this.toastr.error(err.error.message, 'Failed');
      this.loadingOverlay = false;
    })
  }


  onSubmitRegister(){
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    this.loadingOverlay = true;
    this.auth.Register(this.registerForm.get('regName').value,this.registerForm.get('regEmail').value,this.registerForm.get('regPassword').value)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      console.log(data);
      this.toastr.success('Welcome', 'Success');
      this.showLoginFunc();
      this.loadingOverlay = false;
    },err=>{
      console.log(err);
      this.toastr.error(err.error.message, 'Failed');
      this.loadingOverlay = false;
    })
  }

}
