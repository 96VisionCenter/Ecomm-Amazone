import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  items: any []=[];

  productList: Product[] = [];
constructor(private productservice:ProductService){
}

ngOnInit(): void {
  this.getProducts()
}
getProducts(){
  this.productservice.getJson().subscribe(resp=>{
    this.items = resp
  })

}
}
