import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {LoginComponent} from "./user/login/login.component";
import {RegisterComponent} from "./user/register/register.component";
import {CartComponent} from "./user/cart/cart.component";
import {AdminComponent} from "./admin/admin.component";
import {AuthGuard} from "./auth.guard";
import {AuthAdminGuard} from "./auth-admin.guard";

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', canActivate: [AuthGuard], component: MainComponent },
  { path: 'cart', canActivate: [AuthGuard], component: CartComponent },
  { path: 'admin', canActivate: [AuthGuard, AuthAdminGuard], component: AdminComponent },
  { path: 'admin/:id', canActivate: [AuthGuard, AuthAdminGuard], component: AdminComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
