import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {NewUserDTO, createNewUserDTO} from '../DTOs/NewUserDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  slay():Observable<any> {
    return this.http.get(`${environment.api}user/slay`);
  }

  login(dto: NewUserDTO):Observable<any> {
    return this.http.post(`${environment.api}user/login`, 
    dto, 
    {headers: new HttpHeaders().set("content-type", "application/json")}
    );
  }

  register(dto: NewUserDTO):Observable<any> {
    return this.http.post(`${environment.api}user/register`, 
    dto, 
    {headers: new HttpHeaders().set("content-type", "application/json")}
    );
  }

  logout():Observable<any> {
    return this.http.put(`${environment.api}user/logout`, 
    {headers: new HttpHeaders().set("content-type", "application/json")}
    );
  }
}
