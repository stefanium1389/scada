import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RTUDTO } from '../DTOs/RTUDTO';

@Injectable({
  providedIn: 'root'
})
export class RtuService {

  constructor(private http: HttpClient) { }

  addRTU(dto: RTUDTO):Observable<any> {
    return this.http.post(`${environment.api}rtu`, 
    dto, 
    {headers: new HttpHeaders().set("content-type", "application/json")}
    );
  }

  getAllRTUs():Observable<any> {
    return this.http.get(`${environment.api}rtu`);
  }

  editRTU(dto: RTUDTO, id: number):Observable<any> {
    console.log(dto);
    return this.http.put(`${environment.api}rtu/` + id, 
    dto, 
    {headers: new HttpHeaders().set("content-type", "application/json")}
    );
  }

  deleteRTU(id: number):Observable<any> {
    return this.http.delete(`${environment.api}rtu/` + id);
  }
}
