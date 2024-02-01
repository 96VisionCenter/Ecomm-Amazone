import { Product } from './../product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ShoppingCard } from '../shopping-card';
import { ShoppingCartService } from '../shopping-cart.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent  implements OnInit {
  productData:any | Product|undefined;
  productQuantity: number = 1;
  relatedProducts: Product[] = [];
  productList: Product[] = [];
  selectedProducts: Product[] = [];
  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private _sanitizer: DomSanitizer,
    private router: Router,
    private shoppingCardService:ShoppingCartService
  ) {}
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params) => {
      const productId = params.get('productId');
      if (productId) {
        this.productService.getProduct(productId).subscribe((result) => {
          this.productData = result;
          this.onCategorySelected(this.productData.categoryId);
          this.productData &&         
            this.productService.addRecentlyViewedProduct(this.productData);
        });
        
      }
    });
  }

  
  navigateToDetails(productId: number) {
    this.router.navigate(['/details', productId]);
  }
  base64ToImg(base64String: any): any {
    let data = this._sanitizer.bypassSecurityTrustResourceUrl(
      'data:png;base64' + base64String
    );
    return 'data:image/png;base64,' + base64String;
  }
  onCategorySelected(categoryId: number) {
    this.productService.getProductBycategoryid(categoryId).subscribe(
      (products) => {
        this.relatedProducts = products.filter(
          (item: Product) => item.id !== this.productData?.id
        );
        console.log(this.relatedProducts);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  oncompare(productId: number) {
    const selectedProduct = this.relatedProducts.find(item => item.id === productId);
    if (selectedProduct) {
      // Toggle selection (add or remove from the list)
      const index = this.selectedProducts.findIndex(item => item.id === selectedProduct.id);
      if (index === -1) {
    
        this.selectedProducts.push(selectedProduct);
      } else {

        this.selectedProducts.splice(index, 1);
      }
    }

  }
  addToCart(productId: any) {
    const shoppingCard = new ShoppingCard();
    shoppingCard.productId = productId;
    shoppingCard.count = 1;
    this.shoppingCardService.addToCart(shoppingCard).subscribe(response => {
      console.log('Product added to cart successfully');
    }, error => {
      console.log('Error occurred while adding product to cart');
    });
    // this.router.navigateByUrl("/home");
  }
  
    

}


  


