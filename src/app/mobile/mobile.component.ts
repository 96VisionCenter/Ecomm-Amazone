import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrl: './mobile.component.scss'
})
export class MobileComponent implements OnInit {
    
  productList: Product[] = [];
constructor(private productService:ProductService,private _sanitizer:DomSanitizer,private router:Router){}
ngOnInit() {
  this.onCategorySelected(1);
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
