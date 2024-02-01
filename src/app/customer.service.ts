
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Customer } from './customer';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
// export interface Customer {
//   name: string;
//   email: string;
//   address: string;
//   pinCode: string;
//   imageFile: File;
//   // Add other properties as needed
// }
export class CustomerService {
  private dataSubject = new BehaviorSubject<boolean>(false);
  data$ = this.dataSubject.asObservable();

  updateData() {
    this.dataSubject.next(true);
  }
  private url='https://localhost:7182/api/Customer';
  
constructor(private httpClient: HttpClient,private _sanitizer:DomSanitizer) { }
getAll(pageIndex: number, pageSize: number): Observable<any> {
  let params = new HttpParams();
  params = params.append('pageIndex', pageIndex.toString());
  params = params.append('pageSize', pageSize.toString());
  return this.httpClient.get<any>("https://localhost:7182/api/Customer/", { params: params })
    .pipe(
      map(data => {
        data.totalRecords = data.totalCount;
        data.data = data.items;
        return data;
      })
    );
}
  saveCustomer(newCustomer: Customer,file?:File): Observable<HttpEvent<any>> {
    debugger
    const formData = new FormData();
    
    formData.append('name', newCustomer.name);
    formData.append('email', newCustomer.email);
    formData.append('address', newCustomer.address);
    formData.append('pinCode', newCustomer.pinCode.toString()); 
    formData.append('cityId',newCustomer.cityId.toString());
    
    if (!!file) {
      formData.append('imageFile', file!,file?.name);
    }
   
    return this.httpClient.post<any>(this.url, formData);
  }
  
  updateCustomer(editCustomer: Customer, file?: File): Observable<any> {
    const formData = new FormData();
  formData.append('id',editCustomer.id.toString());
    formData.append('name', editCustomer.name);
    formData.append('email', editCustomer.email);
    formData.append('address', editCustomer.address);
    formData.append('pinCode', editCustomer.pinCode.toString());
    formData.append('cityId', editCustomer.cityId.toString());
    if (file) {
      formData.append('imageFile', file, file.name);
    }
    return this.httpClient.put<any>(`${this.url}/${editCustomer.id}`, formData);
  }
  
  deleteCustomer(id: number): Observable<any> {
    return this.httpClient.delete<any>("https://localhost:7182/api/Customer/" + id);
  }

  getCountries(): Observable<any> {
    return this.httpClient.get<any>("https://localhost:7182/api/Country/");
  }

  getStates(countryId: number): Observable<any> {
    return this.httpClient.get<any>("https://localhost:7182/api/State/GetStatesByCountry?countryId=" + countryId);
  }

  getCities(stateId: number): Observable<any> {
    return this.httpClient.get<any>("https://localhost:7182/api/City/GetCitiesByState?stateId=" + stateId); 
  }
  uploadImage(formData: FormData): Observable<any> {
    return this.httpClient.post<any>("https://localhost:7182/api/SaveImage", formData);
   
}

}

