import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TrendingComponent } from './trending/trending.component';
import { RegistrationComponent } from './registration/registration.component';
import { TagsManagementComponent } from './tags-management/tags-management.component';
import { AlarmsComponent } from './tags-management/alarms/alarms.component';
import { ReportsComponent } from './reports/reports/reports.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "trending", component: TrendingComponent},
  {path: "register", component: RegistrationComponent},
  {path: "tags", component: TagsManagementComponent},
  {path: 'alarms', component: AlarmsComponent},
  {path: "reports", component: ReportsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
