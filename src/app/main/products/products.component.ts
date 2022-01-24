import { Component, OnInit } from '@angular/core';
import {SnackbarService} from "../../shared/service/snackbar.service";
import {HttpService} from "../../shared/service/http.service";
import {UserService} from "../../user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any;
  isAdmin: boolean;

  constructor(private httpService: HttpService, private userService: UserService, private snackbar: SnackbarService, private router: Router) {
    this.products = [];
    this.isAdmin = false;
  }

  ngOnInit(): void {
    this.isAdmin = this.userService.getUserRole() == 'admin';
    this.loadProducts();
  }

  loadProducts(): void {
    this.httpService.get('product/').subscribe(
      res => {
        this.products = res.data;
      },
      error => {
        this.snackbar.showMessage("Products could not be fetched...");
      }
    )
  }

  onAddProduct(id: number) {
    this.userService.addToCart(id);
    this.snackbar.showMessage("Product has been successfully added to your cart.");
  }

  onEditProduct(id: number) {
    this.router.navigate(['/admin/' + id.toString()]);
  }

  onDeleteProduct(id: number) {
    this.httpService.delete('product/' + id.toString()).subscribe(
      res => {
        this.loadProducts();
        this.snackbar.showMessage("Product successfully deleted.");
      },
      error => {
        console.log(error);
        this.snackbar.showMessage("Products could not be deleted...");
      }
    )
  }
}
