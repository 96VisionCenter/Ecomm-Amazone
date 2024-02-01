import { ShoppingCartService } from './shopping-cart.service';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { ShoppingCard } from './shopping-card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'angular17_without_standalone'
  
  constructor(public loginService:LoginService,private productservice:ProductService,private ShoppingCartService:ShoppingCartService){}

  ngOnInit(){
  const storedData = sessionStorage.getItem('recentlyViewedProducts');
  if (storedData) {
    const { products, timestamp } = JSON.parse(storedData);
    const currentTime = new Date().getTime();
    const thirtyMinutesInMillis = 30 * 60 * 1000;

    if (currentTime - timestamp > thirtyMinutesInMillis) {
      this.productservice.clearRecentlyViewedProducts();
    }
  }}

  LogOutClick()
{
  this.loginService.logOut();
}
// addToCart(product: any) {
//   const shoppingCard = new ShoppingCard();
//   shoppingCard.productId = product.id;
//   shoppingCard.count = 1;
//   this.ShoppingCartService.addToCart(shoppingCard).subscribe(response => {
//     console.log('Product added to cart successfully');
//   }, error => {
//     console.log('Error occurred while adding product to cart');
//   });
// }
}
