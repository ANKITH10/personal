import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BooksComponent } from './components/books/books.component';
import { CartComponent } from './components/cart/cart.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { AdminComponent } from './components/admin/admin.component'; // Import Admin Component

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' }, // Home Page
  { path: 'login', component: LoginComponent }, // Login Page
  { path: 'register', component: RegisterComponent }, // Register Page
  { path: 'books', component: BooksComponent }, // Books Page
  { path: 'cart', component: CartComponent }, // Cart Page
  { path: 'place-order', component: PlaceOrderComponent }, // Place Order Page
  { path: 'admin', component: AdminComponent }, // Admin Page
];
