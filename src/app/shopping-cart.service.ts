import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShoppingCard } from './shopping-card';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private apiUrl = 'https://localhost:7182/api/Card';

  constructor(private http: HttpClient) {}
 

  addToCart(shoppingCart: ShoppingCard): Observable<ShoppingCard> {
     debugger
     const formData = new FormData();
     formData.append('productId', shoppingCart.productId.toString())
   formData.append('count', shoppingCart.count.toString())
    return this.http.post<ShoppingCard>(`${this.apiUrl}`, shoppingCart);
  }

}