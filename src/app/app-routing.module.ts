import { ProductService } from './product.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomerService } from './customer.service';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ActivateGuardService } from './activategaurd.service';
import { ProductComponent } from './product/product.component';
import { HeadersComponent } from './headers/headers.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { CardsComponent } from './cards/cards.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SearchComponent } from './search/search.component';
import { MobileComponent } from './mobile/mobile.component';
import { ElectronicAccessoriesDevicesComponent } from './electronic-accessories-devices/electronic-accessories-devices.component';
import { WomensClothComponent } from './womens-cloth/womens-cloth.component';
import { CompareProductComponent } from './compare-product/compare-product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [

  {path:"",redirectTo:"home",pathMatch:"full"},
    {path:"customer",component:CustomerComponent ,canActivate:[ActivateGuardService]},
    {path:"login",component:LoginComponent},
    {path:"register",component:RegisterComponent},
    {path:"shoppingCart",component:ShoppingCartComponent}, 
    {path:"product", component:ProductComponent},
    {path:"home",component:HomeComponent},
    {
      path: 'home/:selectedProductId',
      component: HomeComponent
    },
    {path:"footer",component:FooterComponent},
  
    {path:"header",component:HeadersComponent},
    {path:"cards",component:CardsComponent},
    {
      component:ProductDetailComponent,
      path:'details/:productId' 
    },
    {
      component:ShoppingCartComponent,
      path:'shoppingcart/:productId' 
    },

    {
      component:CompareProductComponent,
      path:'compare/:productId' 
    },
    { path: 'details/:productId', component: ProductDetailComponent },
  { path: 'compare/:productId/:selectedProductId', component: CompareProductComponent },
    // { path: 'details/:id', component: ProductDetailComponent },
    {
      component: SearchComponent,
      path:'search/:query'
    },
    {
      component: MobileComponent,
      path:'category/:categoryId'
    },
    {
      component: ElectronicAccessoriesDevicesComponent,
      path:'Electronic/:categoryId'
    },
    {
      component: WomensClothComponent,
      path:'WomensCloth/:categoryId'
    }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,HttpClientModule,FormsModule],
  providers: [CustomerService,ProductService]
})
export class AppRoutingModule { }
