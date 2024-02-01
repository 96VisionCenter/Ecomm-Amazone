import { Product, ProductFilter } from './../product';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrl: './headers.component.scss'
})
export class HeadersComponent implements OnInit {
  menuType: string = 'default';
  sellerName:string="";
  isLoggedIn: boolean = false;
  userName: string = '';
  searchResult:undefined|Product[];
  cartItems=0;
  searchTerm: string = '';
  constructor(private route: Router, private product:ProductService,private _sanitizer:DomSanitizer,private loginservice:LoginService) {
     this.isLoggedIn =loginservice .isAuthenticated();
     this.userName = '';
    
  }

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
         let sellerStore=localStorage.getItem('seller');
         let sellerData =sellerStore && JSON.parse(sellerStore)[0];
         this.sellerName=sellerData.name;
          this.menuType = 'seller';
        }
        else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName= userData.name;
          this.menuType='user';
          
        }
         else {
          this.menuType = 'default';
        }
      }
    });
    
    let cartData= localStorage.getItem('localCart');
    if(cartData){
      this.cartItems= JSON.parse(cartData).length
    }
   
  }
  logout(){
    localStorage.removeItem('seller');
    this.route.navigate(['/'])
  }
  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth'])
  
  }

  searchProduct(value: string) {
    if (value) {
      this.product.searchProduct(value).subscribe((result) => {
        this.searchResult = result.filter(product =>
          product.name.toLowerCase().includes(value.toLowerCase())
        );
      });
    } else {
      this.searchResult = undefined;
    }
  }
  autoDetectSection(productName: string): string {
    if (productName && productName.length > 0) {
      const firstLetter = productName.charAt(0).toUpperCase();
      if (firstLetter >= 'A' && firstLetter <= 'Z') {
        return firstLetter;
      }
    }
    return 'Other';
  }
  hideSearch(){
    this.searchResult=undefined
  }
  redirectToDetails(id:number){
    this.route.navigate(['/details/'+id])
  }
  submitSearch(val:string){
    console.warn(val)
  this.route.navigate([`search/${val}`]);
  }
  base64ToImg(base64String: any): any {  
    let data = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + base64String);
    return data;
  }
  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    this.searchTerm = event.option.value.name;
}

}

