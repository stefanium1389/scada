import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AnalogInputDTO, AnalogInputIdDTO } from '../DTOs/AnalogInputDTO';
import { AnalogOutputDTO } from '../DTOs/AnalogOutputDTO';
import { DigitalInputDTO } from '../DTOs/DigitalInputDTO';
import { DigitalOutputDTO } from '../DTOs/DigitalOutputDTO';
import { ChangeValueDTO } from '../DTOs/CurrentValueDTO';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  addAnalogInput(dto: AnalogInputDTO):Observable<any> {
    return this.http.post(`${environment.api}tag/analogInput`, 
    dto, 
    {headers: new HttpHeaders().set("content-type", "application/json")}
    );
  }

  getAllAnalogInputs():Observable<any> {
    return this.http.get(`${environment.api}tag/analogInput`);
  }

  editAnalogInput(dto: AnalogInputDTO, id: number):Observable<any> {
    console.log(dto);
    return this.http.put(`${environment.api}tag/analogInput/` + id, 
    dto, 
    {headers: new HttpHeaders().set("content-type", "application/json")}
    );
  }

  deleteAnalogInput(id: number):Observable<any> {
    return this.http.delete(`${environment.api}tag/analogInput/` + id);
  }

  addAnalogOutput(dto: AnalogOutputDTO):Observable<any> {
    return this.http.post(`${environment.api}tag/analogOutput`, 
    dto, 
    {headers: new HttpHeaders().set("content-type", "application/json")}
    );
  }

  getAllAnalogOutputs():Observable<any> {
    return this.http.get(`${environment.api}tag/analogOutput`);
  }

  editAnalogOutput(dto: AnalogOutputDTO, id: number):Observable<any> {
    console.log(dto);
    return this.http.put(`${environment.api}tag/analogOutput/` + id, 
    dto, 
    {headers: new HttpHeaders().set("content-type", "application/json")}
    );
  }

  editAnalogOutputValue(dto: ChangeValueDTO, id: number):Observable<any> {
    console.log(dto);
    return this.http.put(`${environment.api}tag/analogOutput/changeValue/` + id, 
    dto, 
    {headers: new HttpHeaders().set("content-type", "application/json")}
    );
  }

  deleteAnalogOutput(id: number):Observable<any> {
    return this.http.delete(`${environment.api}tag/analogOutput/` + id);
  }

  addDigitalInput(dto: DigitalInputDTO):Observable<any> {
    return this.http.post(`${environment.api}tag/digitalInput`, 
    dto, 
    {headers: new HttpHeaders().set("content-type", "application/json")}
    );
  }

  getAllDigitalInputs():Observable<any> {
    return this.http.get(`${environment.api}tag/digitalInput`);
  }

  editDigitalInput(dto: DigitalInputDTO, id: number):Observable<any> {
    console.log(dto);
    return this.http.put(`${environment.api}tag/digitalInput/` + id, 
    dto, 
    {headers: new HttpHeaders().set("content-type", "application/json")}
    );
  }

  deleteDigitalInput(id: number):Observable<any> {
    return this.http.delete(`${environment.api}tag/digitalInput/` + id);
  }

  addDigitalOutput(dto: DigitalOutputDTO):Observable<any> {
    return this.http.post(`${environment.api}tag/digitalOutput`, 
    dto, 
    {headers: new HttpHeaders().set("content-type", "application/json")}
    );
  }

  getAllDigitalOutputs():Observable<any> {
    return this.http.get(`${environment.api}tag/digitalOutput`);
  }

  editDigitalOutput(dto: DigitalOutputDTO, id: number):Observable<any> {
    console.log(dto);
    return this.http.put(`${environment.api}tag/digitalOutput/` + id, 
    dto, 
    {headers: new HttpHeaders().set("content-type", "application/json")}
    );
  }

  editDigitalOutputValue(dto: ChangeValueDTO, id: number):Observable<any> {
    console.log(dto);
    return this.http.put(`${environment.api}tag/digitalOutput/changeValue/` + id, 
    dto, 
    {headers: new HttpHeaders().set("content-type", "application/json")}
    );
  }

  deleteDigitalOutput(id: number):Observable<any> {
    return this.http.delete(`${environment.api}tag/digitalOutput/` + id);
  }
}