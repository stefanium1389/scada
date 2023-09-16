import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrendingComponent } from './trending/trending.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegistrationComponent } from './registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {TextFieldModule} from '@angular/cdk/text-field';

import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatDialogModule} from "@angular/material/dialog";


import { TagsManagementComponent } from './tags-management/tags-management.component';
import { AlarmsComponent } from './tags-management/alarms/alarms.component';
import { RtuComponent } from './tags-management/rtu/rtu.component';
import { AnalogInputComponent } from './tags-management/analog-input/analog-input.component';
import { AnalogOutputComponent } from './tags-management/analog-output/analog-output.component';
import { DigitalInputComponent } from './tags-management/digital-input/digital-input.component';
import { DigitalOutputComponent } from './tags-management/digital-output/digital-output.component';
import { EditComponent } from './tags-management/edit/edit.component';
import { DescriptionComponent } from './tags-management/description/description.component';
import { ChangeValueComponent } from './tags-management/change-value/change-value.component';
import { ReportsComponent } from './reports/reports/reports.component';
import { AlarmsTimeComponent } from './reports/alarms-time/alarms-time.component';
import { AlarmsPriorityComponent } from './reports/alarms-priority/alarms-priority.component';
import { TagsTimeComponent } from './reports/tags-time/tags-time.component';
import { AiLastComponent } from './reports/ai-last/ai-last.component';
import { DiLastComponent } from './reports/di-last/di-last.component';
import { TagIdComponent } from './reports/tag-id/tag-id.component';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    TrendingComponent,
    LoginComponent,
    NavbarComponent,
    RegistrationComponent,
    TagsManagementComponent,
    AlarmsComponent,
    RtuComponent,
    AnalogInputComponent,
    AnalogOutputComponent,
    DigitalInputComponent,
    DigitalOutputComponent,
    EditComponent,
    DescriptionComponent,
    ChangeValueComponent,
    ReportsComponent,
    AlarmsTimeComponent,
    AlarmsPriorityComponent,
    TagsTimeComponent,
    AiLastComponent,
    DiLastComponent,
    TagIdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatTabsModule,
    TextFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatSortModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
