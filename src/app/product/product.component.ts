

import { Component, SecurityContext } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { Category } from '../category';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'] 
})
export class ProductComponent {
  
  productList: Product[] = [];
  newproduct: Product = new Product();
  editProduct: Product = new Product();
  Categories:Category[] = [];
  selectedCategory: number[] = [0];
  selectedFile:File|null=null;
    // Pagination
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
    }
  onCategoryChange() {
    
    this.productService.getcategory().subscribe(
      (response) => {
        this.Categories = response;
        console.log(response);
        if (this.Categories.length > 0) {
          this.selectedCategory[0] = this.Categories[0].id;
        }
        
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
editImagechange(event:any){
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
saveClick() {
  this.newproduct.categoryId = this.selectedCategory[0]; // Assign categoryId for new product
  this.newproduct.imageFile = this.selectedFile;

  if (this.editProduct.id) {
    this.editProduct.categoryId = this.selectedCategory[0]; // Assign categoryId for edited product
    this.productService.updateProduct(this.editProduct, this.selectedFile!).subscribe(
      (response) => {
        console.log('Product updated successfully:', response);
        this.getAll(0, 5);
        this.showAlert('success', 'Product updated successfully');
      },
      (error) => {
        console.log('Error updating product:', error);
        this.showAlert('error', 'Error updating product');
      },
      () => {
        console.log('Update operation completed.');
      }
    );
  } else {
    this.productService.saveProduct(this.newproduct, this.selectedFile!).subscribe(
      (response) => {
        console.log('Product saved successfully:', response);
        this.getAll(0, 5);
        this.showAlert('success', 'Product saved successfully');
      },
      (error) => {
        console.log('Error saving product:', error);
        this.showAlert('error', 'Error saving product');
      },
      () => {
        console.log('Save operation completed.');
      }
    );
  }
}

showAlert(icon: any, message: string) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast:any) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  Toast.fire({
    icon: icon,
    title: message,
    customClass: {
      popup: 'custom-popup-class', 
      title: 'custom-title-class', 
    },
    didClose: () => {
      console.log('Toast closed'); 
    },
  });
}

editedClick(product: any) {
  this.editProduct = { ...product };
  this.imagePreview = this.base64ToImg(product.imageUrl) as string;
}
  //  clear_Rec() {
  //   this..name = "";
  //   this.newCustomer.email = "";
  //   this.newCustomer.address="";
  //   this.newCustomer.pinCode=0;   
  // }
  sweetAlertClick(id:number)
  {
    Swal.fire({
      title: 'Are you sure want to delete Data?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.productService.deleteProduct(id).subscribe(
          (response)=>{
            this.getAll(0,5);
          },
          (error)=>{
            console.log(error);
          }
        )     
      } else if (result.dismiss === Swal.DismissReason.cancel) {       
      }
    })
  }
}
