import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { ModalComponent } from './modal/modal.component';
import { MaskitoDirective } from '@maskito/angular';
import { ActiveaccountComponent } from './activeaccount/activeaccount.component';
import { ModalfilterComponent } from './modalfilter/modalfilter.component';
import { SearchComponent } from './search/search.component';
import { FrenchDatePipe } from './pipes/french-date.pipe';
import { CreateadressComponent } from './createadress/createadress.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { SizeselectmodalComponent } from './sizeselectmodal/sizeselectmodal.component';
import { CartComponent } from './cart/cart.component';
import {ProductComponent as ProductStandalone } from './standalone/product/product.component';
import { DiscountPipe } from './pipes/discount.pipe'
import { tokenInterceptor } from './interceptors/token.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    HomeComponent,
    ProfileComponent,
    ModalComponent,
    ActiveaccountComponent,
    ModalfilterComponent,
    SearchComponent,
    FrenchDatePipe,
    CreateadressComponent,
    ProductdetailsComponent,
    SizeselectmodalComponent,
    CartComponent,
    ProductStandalone,
    DiscountPipe
    
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaskitoDirective,
    FormsModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },{ provide: HTTP_INTERCEPTORS, useClass: tokenInterceptor, multi: true },],
  bootstrap: [AppComponent],
})
export class AppModule {}
