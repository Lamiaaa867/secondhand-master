import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/signup/signup.component';
import { canActivate, redirectLoggedInTo,redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { ProfileComponent } from './components/profile/profile.component';
import { ListingCreationComponent } from './components/listing-creation/listing-creation.component';
import { ProductDetailsComponent } from './components/product/product.component';
import {WishlistComponent}from './components/wishlist/wishlist.component'

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['home'])

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectToHome)
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    ...canActivate(redirectToHome)
  },
  {
    path: 'home/:chatid',
    component: HomeComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path: 'profile',
    component: ProfileComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path: 'create',
    component: ListingCreationComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path: 'product',
    component: ProductDetailsComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    ...canActivate(redirectToLogin)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
