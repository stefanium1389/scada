import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AnalogInputDTO, AnalogInputIdDTO } from '../DTOs/AnalogInputDTO';

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
}