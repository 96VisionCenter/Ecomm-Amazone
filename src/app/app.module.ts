import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule} from '@angular/material/card'; 
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelperService, JwtInterceptor, JwtModule } from '@auth0/angular-jwt';
import { JwtinterceptorService } from './jwtinterceptor.service';
import { ProductComponent } from './product/product.component';
import {MatIconModule} from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { HeadersComponent } from './headers/headers.component';
import { FooterComponent } from './footer/footer.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CardsComponent } from './cards/cards.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SearchComponent } from './search/search.component';
import { MobileComponent } from './mobile/mobile.component';
import { MatListModule } from '@angular/material/list';
import { ElectronicAccessoriesDevicesComponent } from './electronic-accessories-devices/electronic-accessories-devices.component';
import { WomensClothComponent } from './womens-cloth/womens-cloth.component';
import { MatInputModule } from '@angular/material/input';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { CompareProductComponent } from './compare-product/compare-product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    HeadersComponent,
    ProductComponent,
    FooterComponent,
    CardsComponent,
    ProductDetailComponent,
    SearchComponent,
    MobileComponent,
    ElectronicAccessoriesDevicesComponent,
    WomensClothComponent,
    CompareProductComponent,
    ShoppingCartComponent,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatListModule,
    MatAutocompleteModule,
    BrowserAnimationsModule, 
    JwtModule.forRoot({
      config:{
        tokenGetter:()=>{
          return sessionStorage.getItem
          ('currentUser')?JSON.parse(sessionStorage.getItem('currentUser') as string).token:null;
        }
      }
    }),
  ],
  providers: [
    {
      
      provide: HTTP_INTERCEPTORS,
      useClass:JwtinterceptorService,
      multi: true,
    },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }

