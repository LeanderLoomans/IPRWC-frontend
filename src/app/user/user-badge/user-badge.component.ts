import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-badge',
  templateUrl: './user-badge.component.html',
  styleUrls: ['./user-badge.component.css']
})
export class UserBadgeComponent implements OnInit {
  username: string = "User";
  isAdmin: boolean = false;

  constructor(private router: Router, private userService: UserService) {
    this.username = userService.getUserEmail().split('@')[0];
    this.isAdmin = userService.getUserRole() == 'admin';
  }

  ngOnInit(): void {
  }

  onLogOut(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

}
