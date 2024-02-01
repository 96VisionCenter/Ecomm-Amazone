import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-electronic-accessories-devices',
  templateUrl: './electronic-accessories-devices.component.html',
  styleUrl: './electronic-accessories-devices.component.scss'
})
export class ElectronicAccessoriesDevicesComponent implements OnInit {
    
  productList: Product[] = [];
constructor(private productService:ProductService,private _sanitizer:DomSanitizer,private router:Router){}
ngOnInit() {
  this.onCategorySelected(4);
}
onCategorySelected(categoryId: number)  {
    this.productService.getProductBycategoryid(categoryId).subscribe(
      (products) => {
        this.productList = products;
        console.log(products); 
      },
      (error) => {
        console.log(error);
      }
    );
  }
  navigateToDetails(productId: number) {
    this.router.navigate(['/details', productId]);
  }
base64ToImg(base64String: any): any {  
  let data = this._sanitizer.bypassSecurityTrustResourceUrl('data:png;base64'+base64String);
  return 'data:image/png;base64,' + base64String;
}
}
