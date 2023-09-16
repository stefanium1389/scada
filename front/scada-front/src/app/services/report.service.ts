import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  alarmsTime(start:Date, end:Date):Observable<any> {
    return this.http.post(`${environment.api}reports/alarms/time`, 
    {StartDateTime:start, EndDateTime:end}, 
    {headers: new HttpHeaders().set("content-type", "application/json")}
    );
  }
}
