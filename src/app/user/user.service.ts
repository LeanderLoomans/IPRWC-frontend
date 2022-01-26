import {HttpService} from "../shared/service/http.service"
import { Injectable } from "@angular/core";
import { User } from './user';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private resourcePath: string;

  constructor(
    private api: HttpService
  ) {
    this.resourcePath = 'user';
  }

  login(user: User, loginCallback: any) {
    return this.api.post(this.resourcePath + '/login', user).subscribe(
      (res: any) => {
        this.saveJwt(res);
        console.log(res.user.info);
        let cart = JSON.stringify(res.user.info);
        console.log(cart);

        this.saveCart(cart);
        loginCallback();
      },
      error => {
        loginCallback(error, true);
      }
    );
  }

  registerUser(user: User, registerCallback: any) {
    return this.api.post(this.resourcePath + '/register', user).subscribe(
      res => {
        registerCallback();
      }, error => {
        registerCallback(true);
      }
    );
  }

  saveJwt(res: any) {
    const jwtToken = res.token;
    localStorage.setItem('jwtToken', jwtToken);
  }

  getJwtToken() {
    return localStorage.getItem('jwtToken');
  }

  saveCart(cart: any) {
    localStorage.setItem('userCart', JSON.stringify(cart));
  }

  getCart() {
    return JSON.parse(localStorage.getItem('userCart') + '');
  }

  addToCart(id: number) {
    let cart = this.getCart();

    const productIndex = cart.products.indexOf(id);

    if (productIndex === -1) {
      cart.products.push(id);
      cart.quantity.push(1);
    } else {
      cart.quantity[productIndex] = cart.quantity[productIndex] + 1;
    }

    this.saveCart(cart);
  }


  removeFromCart(id: number) {
    let cart = this.getCart();

    const productIndex = cart.products.indexOf(id);

    if (productIndex > -1) {
      cart.quantity[productIndex] = cart.quantity[productIndex] - 1;
      if (cart.quantity[productIndex] === 0) {
        cart.products.splice(productIndex, 1);
        cart.quantity.splice(productIndex, 1);
      }
      this.saveCart(cart);
    }
  }

  checkUserLoggedIn() {
    return localStorage.getItem('jwtToken') != null;
  }

  // Decodes and returns the payload of a JWT token
  private decodeJwt() {
    const jwtToken = this.getJwtToken();
    if (jwtToken === null || jwtToken === undefined || jwtToken.length === 0) {
      return '';
    }
    const base64Payload = jwtToken.split('.')[1];
    const stringPayload = atob(base64Payload);

    return JSON.parse(stringPayload).result;
  }

  getUserId() {
    return this.decodeJwt().id;
  }

  getUserEmail() {
    return this.decodeJwt().email;
  }

  getUserRole() {
    return this.decodeJwt().role;
  }

  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userCart');
  }

  emptyCart() {
    this.saveCart({
      products: [],
      quantity: []
    })
  }
}
