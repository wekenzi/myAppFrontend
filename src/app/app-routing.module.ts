import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from 'src/app/components/login/login.component';
import { MainBoardComponent } from 'src/app/components/main-board/main-board.component';
import { DashBoardComponent } from 'src/app/components/dash-board/dash-board.component';
import { FreelancersComponent } from 'src/app/components/freelancers/freelancers.component';
import { ProjectsComponent } from 'src/app/components/projects/projects.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { AppellationsComponent } from './components/appellations/appellations.component';

const routes: Routes = [
  {path: '', redirectTo: 'm/dashboard', pathMatch: 'full' , canActivate: [AuthGuard]},
  {path: 'm', redirectTo: 'm/dashboard', pathMatch: 'full'},
  {path: 'login', component:LoginComponent},
  {path: 'm', component:MainBoardComponent,canActivate: [AuthGuard], children:[

    {path: 'dashboard', component:DashBoardComponent},
    {path: 'projects', component:ProjectsComponent},
    {path: 'freelancers', component:FreelancersComponent},
    {path: 'payments', component:PaymentsComponent},
    {path: 'appellations', component:AppellationsComponent},

  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
