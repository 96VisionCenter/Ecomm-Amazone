import { Register } from './register';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {


  constructor(private httpClient:HttpClient) { }
  Registeruser(newRegister:Register):Observable<any>
  {
     
    return this.httpClient.post<any>("https://localhost:7182/Register/register",newRegister);
  }
}
