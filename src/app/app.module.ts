import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import { Interceptor } from './services/interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from './material/material.module';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { MainBoardComponent } from './components/main-board/main-board.component';
import { FreelancersComponent } from './components/freelancers/freelancers.component';

// Guards
import { AuthGuard } from './guards/auth.guard';

//Services
import { AuthService } from './services/auth.service';
import { ServiceService } from './services/service.service';
import { DashboardService } from './services/dashboard.service';
import { ProjectService } from './services/project.service';
import { FreelancerService } from './services/freelancer.service';
import { GenerallistsService } from './services/generallists.service';
import { NationalityService } from './services/nationality.service';
import { CurrencyService } from './services/currency.service';
import { PaymentService } from './services/payment.service';
import { ProfileService } from './services/profile.service';
import { StoreService } from './services/store.service';

// Translation
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

//Toaster
import { ToastrModule } from 'ngx-toastr';

// Angular Material Modules
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MAT_DATE_LOCALE } from '@angular/material';
import { LoadingoverlayComponent } from './components/loadingoverlay/loadingoverlay.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { AppellationsComponent } from './components/appellations/appellations.component';
import { AppellationsmodalComponent } from './components/appellationsmodal/appellationsmodal.component';
import { DeletemodalComponent } from './components/deletemodal/deletemodal.component';
import { NodataComponent } from './components/nodata/nodata.component';
import { FreelancersmodalComponent } from './components/freelancersmodal/freelancersmodal.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProfilemodalComponent } from './components/profilemodal/profilemodal.component';
import { SearchPipe } from './pipes/search.pipe';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashBoardComponent,
    MainBoardComponent,
    LoadingoverlayComponent,
    PaymentsComponent,
    AppellationsComponent,
    AppellationsmodalComponent,
    DeletemodalComponent,
    NodataComponent,
    FreelancersComponent,
    FreelancersmodalComponent,
    ProjectsComponent,
    ProfilemodalComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
  }),
    ToastrModule.forRoot({
      timeOut:3000,
      extendedTimeOut:500,
    })
  ],
  providers: [
    AuthGuard,
    AuthService,ServiceService,ProjectService,GenerallistsService,StoreService,DashboardService
    ,NationalityService,CurrencyService,PaymentService,FreelancerService,ProfileService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents:[FreelancersmodalComponent,AppellationsmodalComponent,DeletemodalComponent,ProfilemodalComponent]
})
export class AppModule { }
