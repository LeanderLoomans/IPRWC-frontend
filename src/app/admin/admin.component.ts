import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SnackbarService} from "../shared/service/snackbar.service";
import {HttpService} from "../shared/service/http.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private productId: number | undefined;
  public title: string;

  productForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(0)
  }, [Validators.required]);

  constructor(private route: ActivatedRoute, private httpService: HttpService, private router: Router, private snackbar: SnackbarService) {
    this.title = "New Product";
  }

  ngOnInit(): void {
    let productId = this.route.snapshot.params['id'];

    if (productId) {
      this.getProduct(productId)
    }
  }

  getProduct(id: number) {
    this.httpService.get('product/' + id.toString()).subscribe(
      res => {
        // @ts-ignore
        this.productId = res.data.id;
        // @ts-ignore
        this.productForm.controls['title'].setValue(res.data.title);
        // @ts-ignore
        this.productForm.controls['description'].setValue(res.data.description);
        // @ts-ignore
        this.productForm.controls['price'].setValue(res.data.price);

        // @ts-ignore
        this.title = "Edit Product #" + res.data.id.toString();
      },
      error => {
        this.snackbar.showMessage("Product data could not be fetched...");
      }
    )
  }


  checkFormValidity() {
    return this.productForm.valid;
  }

  onSubmit() {
    if (this.productId) {
      this.updateProduct();
    }
    else {
      this.addProduct();
    }
  }

  private addProduct() {
    this.httpService.post('product/', {
      title: this.productForm.value.title,
      description: this.productForm.value.description,
      price: this.productForm.value.price
    }).subscribe(
      res => {
        this.snackbar.showMessage("Product has been created.");
        this.router.navigate(['/home'])
      },
      error => {
        this.snackbar.showMessage("Product could not be created...");
      }
    )
  }

  private updateProduct() {
    this.httpService.put('product/', {
      title: this.productForm.value.title,
      description: this.productForm.value.description,
      price: this.productForm.value.price,
      id: this.productId
    }).subscribe(
      res => {
        this.snackbar.showMessage("Product has been updated.");
        this.router.navigate(['/home'])
      },
      error => {
        this.snackbar.showMessage("Product could not be updated...");
      }
    )
  }
}
