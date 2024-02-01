
import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl();
  searchResults: Product[] = [];
  searchResult: undefined | Product[];
  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService,
    private _sanitizer: DomSanitizer
  ) { }
  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    console.warn(query);
    query && this.product.searchProduct(query).subscribe((result) => {
      this.searchResult = result;
    });
    this.setupSearch();
  }
  base64ToImg(base64String: any): any {  
    let data = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + base64String);
    return data;
  }
  private setupSearch() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300), 
        switchMap(query => this.product.searchProduct(query))
      )
      .subscribe(results => {
        this.searchResults = results;
      });
  }
}


