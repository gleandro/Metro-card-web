import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UserEntity} from "../models/userEntity.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  userInfo: UserEntity = new UserEntity();

  constructor(private router: Router) {
    localStorage.getItem('userInfo') || this.router.navigate(['/login']);
    this.userInfo = JSON.parse(localStorage.getItem('userInfo') || "");
  }

}
