
import { State } from './../state';
import { Component, SecurityContext } from '@angular/core';
import { Customer } from '../customer';
import { Country } from '../country';
import { City } from '../city';
import { CustomerService } from '../customer.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageConfig } from '@angular/common';
import Swal from 'sweetalert2';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator'

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {
  
  customerList: Customer[] = [];
  newCustomer: Customer = new Customer();
  editCustomer: Customer = new Customer();
  selectedCountry: number = 0;
  selectedState: number = 0;
  selectedCity:number=0;
  countries:Country[] = [];
  filteredStates: State[] = [];
  filteredCities: City[] = []; 
   
  selectedFile:File|null=null;
    // Pagination
    p: number = 1;
    itemsPerPage: number = 5;
  constructor(private CustomerService: CustomerService, private http: HttpClient,private _sanitizer:DomSanitizer) { }

  getPaginatedCustomerList(): any[] {
    const startIndex = (this.p - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.customerList.slice(startIndex, endIndex);
  }
  onPageChange(newPage: number): void {
    this.p = newPage;
    this.getAll(0,5);
  }
  ngOnInit() {
    this.CustomerService.data$.subscribe(() => {
      this.getAll(0, 5);
    })
     this.http.get<Country[]>('').subscribe(countries => {
      this.countries = countries;
     });
    this.onCountryChange();
    }
  onCountryChange() {
    this.CustomerService.getCountries().subscribe(
      (response) => {
        this.countries = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    )
  }
  onChange(event:any){
    const file:File=event.target.files[0];
    this.selectedFile=file;
  }
  base64ToImg(base64String: any): any {  
    let data = this._sanitizer.bypassSecurityTrustResourceUrl('data:png;base64'+base64String);
    return 'data:image/png;base64,' + base64String;
}
imagePreview: string | ArrayBuffer | null = null; 
onFileSelected(event: any) {
  const file:File=event.target.files[0];
  this.selectedFile=file;
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  } else {
    this.imagePreview = null;
  }
}
onStateChange(event: any) {
  this.selectedCountry = event.target.value;
  //alert(this.selectedCountry);
  this.CustomerService.getStates(this.selectedCountry).subscribe(
    (response) => {
      this.filteredStates = response;
      console.log(response);
    },
    (error) => {
      console.log(error);
    }
  );
}
convertFile(file:File):Observable<string>{
  debugger
  const reader=new FileReader()
  return new Observable((observer)=>{
    reader.onloadend=()=>{
    observer.next(reader.result as string);
    observer.complete();
    };
  })
}
onImagechange(event:any){
  debugger
  const file:File=event.target.files[0];
  this.selectedFile=file;
  this.convertFile(file).subscribe((base64:string)=>{
this.imagePreview=base64;
  })
}
editImagechange(event:any){
  debugger
  const file:File=event.target.files[0];
  this.selectedFile=file;
  this.convertFile(file).subscribe((base64:string)=>{
this.imagePreview=base64;
  })
}
onCityChange(event: any) {
  this.selectedState = event.target.value;
  //alert(this.selectedState);
  this.CustomerService.getCities(this.selectedState).subscribe(
    (response) => {
      this.filteredCities = response;
      console.log(response);
    },
    (error) => {
      console.log(error);
    }
  );
}
onCityCitySelect(event: any) {
  this.selectedCity = event.target.value;
  // alert(this.selectedCity)
}
getAll(pageIndex: number, pageSize: number) {
  this.CustomerService.getAll(pageIndex, pageSize).subscribe(
    (response) => {
      this.customerList = response;
      console.log(response)
    },
    (error) => {
      console.log(error);
    }
  );
}
saveClick() {
  this.newCustomer.cityId = this.selectedCity;
  this.newCustomer.imageFile = this.selectedFile;

  if (this.editCustomer.id) {
    this.CustomerService.updateCustomer(this.editCustomer, this.selectedFile!).subscribe(
      (response) => {
        console.log('Customer updated successfully:', response);
        this.getAll(0, 5);
        this.clear_Rec();
        this.showAlert('success', 'Customer updated successfully');
      },
      (error) => {
        console.log('Error updating customer:', error);
        this.showAlert('error', 'Error updating customer');
      },
      () => {
        console.log('Update operation completed.');
      }
    );
  } else {
    this.CustomerService.saveCustomer(this.newCustomer, this.selectedFile!).subscribe(
      (response) => {
        console.log('Customer saved successfully:', response);
        this.getAll(0, 5);
        this.clear_Rec();
        this.showAlert('success', 'Customer saved successfully');
      },
      (error) => {
        console.log('Error saving customer:', error);
        this.showAlert('error', 'Error saving customer');
      },
      () => {
        console.log('Save operation completed.');
      }
    );
  }
}
showAlert(icon: any, message: string) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast:any) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  Toast.fire({
    icon: icon,
    title: message,
    customClass: {
      popup: 'custom-popup-class', 
      title: 'custom-title-class', 
    },
    didClose: () => {
      console.log('Toast closed'); 
    },
  });
}
editedClick(customer: any) {
  this.editCustomer = { ...customer };
  this.imagePreview = this.base64ToImg(customer.imageUrl) as string;
}
   clear_Rec() {
    this.newCustomer.name = "";
    this.newCustomer.email = "";
    this.newCustomer.address="";
    this.newCustomer.pinCode=0;   
  }
  sweetAlertClick(id:number)
  {
    Swal.fire({
      title: 'Are you sure want to delete Data?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.CustomerService.deleteCustomer(id).subscribe(
          (response)=>{
            this.getAll(0,5);
          },
          (error)=>{
            console.log(error);
          }
        )     
      } else if (result.dismiss === Swal.DismissReason.cancel) {       
      }
    })
  }
}
