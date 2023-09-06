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

import { TagsManagementComponent } from './tags-management/tags-management.component';
import { AnalogInputFormComponent } from './tags-management/analog-input-form/analog-input-form.component';
import { AnalogInputListComponent } from './tags-management/analog-input-list/analog-input-list.component';
import { DigitalInputFormComponent } from './tags-management/digital-input-form/digital-input-form.component';
import { DigitalInputListComponent } from './tags-management/digital-input-list/digital-input-list.component';
import { AnalogOutputFormComponent } from './tags-management/analog-output-form/analog-output-form.component';
import { AnalogOutputListComponent } from './tags-management/analog-output-list/analog-output-list.component';
import { DigitalOutputListComponent } from './tags-management/digital-output-list/digital-output-list.component';
import { DigitalOutputFormComponent } from './tags-management/digital-output-form/digital-output-form.component';
import { AlarmsComponent } from './tags-management/alarms/alarms.component';
import { RtuComponent } from './tags-management/rtu/rtu.component';

@NgModule({
  declarations: [
    AppComponent,
    TrendingComponent,
    LoginComponent,
    NavbarComponent,
    RegistrationComponent,
    TagsManagementComponent,
    AnalogInputFormComponent,
    AnalogInputListComponent,
    DigitalInputFormComponent,
    DigitalInputListComponent,
    AnalogOutputFormComponent,
    AnalogOutputListComponent,
    DigitalOutputListComponent,
    DigitalOutputFormComponent,
    AlarmsComponent,
    RtuComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
