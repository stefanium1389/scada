import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AlarmDTO, AlarmIdDTO } from '../DTOs/AlarmDTO';

@Injectable({
  providedIn: 'root'
})
export class AlarmService {

  constructor(private http: HttpClient) { }

  addAlarm(dto: AlarmDTO):Observable<any> {
    return this.http.post(`${environment.api}alarm`, 
    dto, 
    {headers: new HttpHeaders().set("content-type", "application/json")}
    );
  }

  getAllAlarmsForTag(id: number):Observable<any> {
    return this.http.get(`${environment.api}alarm/` + id);
  }

  deleteAlarm(id: number):Observable<any> {
    return this.http.delete(`${environment.api}alarm/` + id);
  }

}
