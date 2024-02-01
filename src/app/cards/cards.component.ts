import { HttpClient } from '@angular/common/http';
import { Product } from './../product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';
import { Category } from '../category';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit {
  productId: number=0;
  showDetails: boolean = false;
  productDetails: Product = new Product();
  product: Product[]=[];
  ProductDetails: Product = new Product();
  productList: Product[] = [];
  recentlyViewedProducts: Product[] = [];
  Categories:Category[] = [];
  selectedCategory: number = 0;
  searchResult: undefined | Product[];
  selectedFile:File|null=null;
    p: number = 1;
    itemsPerPage: number = 5;
  constructor(private productService: ProductService, private http: HttpClient,private _sanitizer:DomSanitizer) { }
  getPaginatedProductList(): any[] {
    const startIndex = (this.p - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.productList.slice(startIndex, endIndex);
  }
  onPageChange(newPage: number): void {
    this.p = newPage;
    this.getAll(0,5);
  }
  ngOnInit() {   
    this.productService.data$.subscribe(() => {
      this.getAll(0, 5);
    })
     this.http.get<Category[]>('').subscribe(Categories => {
      this.Categories = Categories;
     });
    this.onCategoryChange();
    this.productService.recentlyViewedProducts$.subscribe(products => {
      this.recentlyViewedProducts = products;
    });
    
    }
  onCategoryChange() {
    this.productService.getcategory().subscribe(
      (response) => {
        this.Categories = response;
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
getAll(pageIndex: number, pageSize: number) {
  this.productService.getAll(pageIndex, pageSize).subscribe(
    (response) => {
      this.productList = response;
      console.log(response)
    },
    (error) => {
      console.log(error);
    }
  );
}
onProductClick(product: Product) {
  this.productDetails = product; 
  if (this.recentlyViewedProducts.includes(product)) {
    this.recentlyViewedProducts.push(product);
  }
}
}






