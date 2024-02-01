import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Product, ProductFilter } from './product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private dataSubject = new BehaviorSubject<boolean>(false);
  private recentlyViewedProductsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  recentlyViewedProducts$: Observable<Product[]> = this.recentlyViewedProductsSubject.asObservable();

  data$ = this.dataSubject.asObservable();
  updateData() {
    this.dataSubject.next(true);
  }
  public url='https://localhost:7182/api/Product';
  

  constructor(private httpClient: HttpClient,private _sanitizer:DomSanitizer) { }
  

  getJson():Observable<any>{
    return this.httpClient.get(this.url )
  }
  getAll(pageIndex: number, pageSize: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('pageIndex', pageIndex.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.httpClient.get<any>("https://localhost:7182/api/Product/", { params: params })
      .pipe(
        map(data => {
          data.totalRecords = data.totalCount;
          data.data = data.items;
          return data;
        })
      );
  }
  saveProduct(newProduct: Product, file?: File): Observable<HttpEvent<any>> {
    debugger
    const formData = new FormData();
    
    formData.append('name', newProduct.name);
    formData.append('description', newProduct.description);
    formData.append('listPrice', newProduct.listPrice.toString());
    formData.append('price', newProduct.price.toString()); 
    formData.append('productBrand', newProduct.productBrand);  // Corrected property name
    formData.append('categoryId', newProduct.categoryId.toString());
    
    if (!!file) {
      formData.append('imageFile', file!, file?.name);
    }
   
    return this.httpClient.post<any>(this.url, formData);
  }
  
  updateProduct(editProduct: Product, file?: File): Observable<HttpEvent<any>> {
    const formData = new FormData();
    
    formData.append('name', editProduct.name);
    formData.append('description', editProduct.description);
    formData.append('listPrice', editProduct.listPrice.toString());
    formData.append('price', editProduct.price.toString());
    formData.append('ProductBrand', editProduct.productBrand);
    formData.append('categoryId', editProduct.categoryId.toString());
    
    if (!!file) {
      formData.append('imageFile', file!, file?.name);
    }
   
    return this.httpClient.put<any>(`${this.url}/${editProduct.id}`, formData);
  }
  
  deleteProduct(id: number): Observable<any> {
    return this.httpClient.delete<any>("https://localhost:7182/api/Product/" + id);
  }

  
getcategory(): Observable<any> {
  return this.httpClient.get<any>("https://localhost:7182/api/categories/");
}
getProductBycategoryid(CategoryId:number): Observable<any> {
  return this.httpClient.get<any>("https://localhost:7182/api/Product/category/"+CategoryId);
}
getProduct(id: string) {
  return this.httpClient.get<Product>(`https://localhost:7182/api/Product/${id}`);
}

searchProduct(query: string) {
  return this.httpClient.get<Product[]>(
    `https://localhost:7182/api/Product/search?searchTerm=${query}`
  );
}
// getAutoSuggestions(query: string): Observable<any[]> {
//   // Adjust the API endpoint and parameters as needed
//   const url = `https://localhost:7182/api/Product/search?searchTerm=${query}`;
//   return this.httpClient.get<any[]>(url);
// }

addRecentlyViewedProduct(product: Product) {
  const currentProducts = this.recentlyViewedProductsSubject.value;
  const index = currentProducts.findIndex((p) => p.id === product.id);

  if (index === -1) {
  
    const updatedProducts = [product, ...currentProducts];
    const slicedProducts = updatedProducts.slice(0, 5);
    this.recentlyViewedProductsSubject.next(slicedProducts);
  }
}
getRecentlyViewedProducts() {
  return this.recentlyViewedProductsSubject.value;
}

clearRecentlyViewedProducts() {
  this.recentlyViewedProductsSubject.next([]);
  localStorage.removeItem('recentlyViewedProducts');
}

}
