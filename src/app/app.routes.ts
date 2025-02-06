import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' }, // Home page route
  { path: 'login', component: LoginComponent }, // Login page route
  { path: 'register', component: RegisterComponent } // Register page route
];
