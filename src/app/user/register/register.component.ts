import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {SnackbarService} from "../../shared/service/snackbar.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hidePassword = true;
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.email]),
    password: new FormControl('')
  }, [Validators.required, Validators.maxLength(45)]);

  constructor(public userService: UserService, private router: Router, private snackbar: SnackbarService) { }

  ngOnInit(): void {
    if (this.userService.checkUserLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  onRegister() {
    if (!this.checkFormValidity()) {
      return;
    }
    this.createUser();
  }

  private createUser() {
    this.userService.registerUser(this.registerForm.value, (isFailed: any) => {
      if (isFailed) {
        this.handleRegisterFail();
        return;
      }

      this.handleRegisterSuccess();
    });
  }

  private handleRegisterSuccess() {
    this.snackbar.showMessage('Registration successful!', 2000);
    this.router.navigate(['/login']);
  }

  private handleRegisterFail() {

    this.snackbar.showMessage('Failed to register...', 2000);
  }

  checkFormValidity() {
    return this.registerForm.valid;
  }
}
