import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AnalogInputValue, DigitalInputValue } from '../trending/trending.component';

@Injectable({
  providedIn: 'root'
})
export class TrendingService {

  constructor(private http:HttpClient) { }
  getCurrentAnalogInputById(id: number):Observable<AnalogInputValue> {
    return this.http.get<AnalogInputValue>(`${environment.api}trending/analogInput/${id}`);
  }
  getCurrentDigitalInputById(id: number):Observable<DigitalInputValue> {
    return this.http.get<DigitalInputValue>(`${environment.api}trending/digitalInput/${id}`);
  }
}
