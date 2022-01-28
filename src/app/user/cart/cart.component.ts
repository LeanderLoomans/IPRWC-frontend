import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpService} from "../../shared/service/http.service";
import {SnackbarService} from "../../shared/service/snackbar.service";
import {UserService} from "../user.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts: any;
  private cart: any;

  constructor(private router: Router, private httpService: HttpService, private userService: UserService, private snackbar: SnackbarService) {
    this.cartProducts = [];
  }

  ngOnInit(): void {
    this.cart = this.userService.getCart();

    this.loadCartProducts();
  }

  onClickBack() {
    this.router.navigate(['/home']);
  }

  updateCart(cart: any) {
    this.userService.saveCart(cart);
  }

  loadCartProducts() {
    this.httpService.post('product/cart/', {
      cart: this.cart.products
    }).subscribe(res => {
        this.cartProducts = res.data;
      },
      error => {
        this.snackbar.showMessage("Products could not be fetched...");
      }
    )
  }

  getAmountFromId(id: number) {
    const productIndex = this.cart.products.indexOf(id);
    return this.cart.quantity[productIndex]
  }

  onClickMore(id: number) {
    this.userService.addToCart(id);
    this.ngOnInit();
  }

  onClickLess(id: number) {
    this.userService.removeFromCart(id);
    this.ngOnInit();
  }

  onPlaceOrder() {
    this.userService.emptyCart();
    this.snackbar.showMessage("Your order has been placed.");
    this.router.navigate(['/home']);
  }

  onClickCloud() {
    console.log(JSON.stringify(this.cart))
    this.httpService.put('user/cart/', {
      cart: JSON.stringify(this.cart)
    }).subscribe(
      res => {
      this.snackbar.showMessage("Your cart has been successfully uploaded.")
    }, error => {
      this.snackbar.showMessage("Your cart could not be uploaded...")
    });
  }

  isEmpty() {
    return !this.cartProducts.length;
  }
}
