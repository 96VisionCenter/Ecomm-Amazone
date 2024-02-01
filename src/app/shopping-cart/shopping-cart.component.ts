import { productData } from './../product';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCard } from '../shopping-card';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  productId: any;
  
  count: any;

  constructor(private shoppingCartService: ShoppingCartService) {}

  addToCart() {
    const shoppingCart: any = {
      productId: this.productId,
      count: this.count
    };
    this.shoppingCartService.addToCart(shoppingCart.productData).subscribe(
      (response) => {
        console.log('Shopping cart item added successfully', response);
        // Handle successful response
      },
      (error) => {
        console.error('Error adding shopping cart item', error);
        // Handle error
      }
    );
  }
}