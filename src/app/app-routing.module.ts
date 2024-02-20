import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { ActiveaccountComponent } from './activeaccount/activeaccount.component';
import { SearchComponent } from './search/search.component';
import { CreateadressComponent } from './createadress/createadress.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'product',
        component: ProductComponent,
      },
      {
        path: 'product/details/:id',
        component: ProductdetailsComponent,
      },
      { path: 'product/search', component: SearchComponent },
      {
        path: 'bag',
        canActivate: [AuthGuard],
        component: CartComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'addadress',
        component: CreateadressComponent,
      },
      {
        path: 'confirmaccount/:id',
        component: ActiveaccountComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
