import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { CartComponent } from './user/cart/cart.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { AdminComponent } from './admin/admin.component';
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {SharedModule} from "./shared/shared.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http"
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { UserBadgeComponent } from './user/user-badge/user-badge.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatDividerModule} from "@angular/material/divider";
import { HeaderComponent } from './main/header/header.component';
import { ProductsComponent } from './main/products/products.component';
import {AuthInterceptor} from "./auth.interceptor";
import {CdkTableModule} from "@angular/cdk/table";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {LoadingSpinnerComponent} from "./shared/loading-spinner/loading-spinner.component";
import { InfoComponent } from './main/info/info.component';
import {MatTabsModule} from "@angular/material/tabs";
import { BackgroundComponent } from './user/background/background.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CartComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    UserBadgeComponent,
    HeaderComponent,
    ProductsComponent,
    LoadingSpinnerComponent,
    InfoComponent,
    BackgroundComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        MatCardModule,
        MatSnackBarModule,
        MatIconModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        SharedModule,
        MatInputModule,
        MatButtonModule,
        MatMenuModule,
        MatDividerModule,
        CdkTableModule,
        MatTableModule,
        MatSortModule,
        MatTabsModule
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
