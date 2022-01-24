import {UserService} from "../user.service";
import {User} from "../user";

export class Cart {
  private userService: UserService;

  public products: number[];
  public quantity: number[];

  constructor(products: number[], quantity: number[], userService: UserService) {
    this.userService = userService;
    this.products = products;
    this.quantity = quantity;
  }

  public emptyCart() {
    this.products = [];
    this.quantity = []
  }

  public setCart(newProducts: number[], newQuantity: number[]) {
    this.products = newProducts;
    this.quantity = newQuantity;

    this.syncCart();
  }

  public getCartProducts() {
    return this.products;
  }

  public getCartQuantity() {
    return this.quantity;
  }

  public addToCart(productId: number) {
    const productIndex = this.products.indexOf(productId);

    if (productIndex === -1) {
      this.products.push(productId);
      this.quantity.push(1);
    }
    else {
      this.quantity[productIndex] = this.quantity[productIndex] + 1;
    }

    this.syncCart();
  }

  public removeFromCart(productId: number) {
    const productIndex = this.products.indexOf(productId);

    if (productId > -1) {
        this.quantity[productIndex] = this.quantity[productIndex] - 1;
        if (this.quantity[productIndex] === 0) {
          this.products.splice(productId);
          this.quantity.splice(productId);
        }
    }
    this.syncCart();
  }

  public syncCart() {
    this.userService.saveCart(this)
  }
}
