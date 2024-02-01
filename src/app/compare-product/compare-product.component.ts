import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';

@Component({
  selector: 'app-compare-product',
  templateUrl: './compare-product.component.html',
  styleUrls: ['./compare-product.component.scss'],
})
export class CompareProductComponent implements OnInit {
  productData: Product | undefined;
  selectedProduct: Product | undefined;
  relatedProducts: Product[] = [];
  isSelectModalOpen = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private _sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params) => {
      const productId = params.get('productId');
      if (productId) {
        this.productService.getProduct(productId).subscribe((result) => {
          this.productData = result;
          this.onCategorySelected(this.productData.id);
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
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSelectProduct() {
    // Store the details of the first product in session storage
    sessionStorage.setItem('firstProduct', JSON.stringify(this.productData));
    this.isSelectModalOpen = true;
  }

  onCloseSelectModal() {
    this.isSelectModalOpen = false;
  }

  onSecondProductSelected(selectedProduct: Product) {
    console.log('Selected second product:', selectedProduct);
    this.selectedProduct = selectedProduct;

    // Navigate to compare route with IDs of both products
    this.router.navigate(['/compare', this.productData?.id, this.selectedProduct.id]);
  }
}
