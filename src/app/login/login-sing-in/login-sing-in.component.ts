import {Component, EventEmitter, Output} from '@angular/core';
import {UserEntity} from "../../models/userEntity.model";
import {UserService} from "../../services/user.service";
import {ApiResponse} from "../../models/apiResponse";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-sing-in',
  templateUrl: './login-sing-in.component.html'
})
export class LoginSingInComponent {
  @Output() changeViewLogin: EventEmitter<boolean> = new EventEmitter<boolean>();
  user: UserEntity = new UserEntity();

  constructor(private userService: UserService, private router: Router) {
  }

  changeView() {
    this.changeViewLogin.emit(false);
  }

  submitForm() {
    this.userService.loginUser(this.user).subscribe((resp: ApiResponse) => {
      if (resp.success) {
        localStorage.setItem('userInfo', JSON.stringify(resp.data));
        this.router.navigate(['/']);
      } else {
        alert(resp.message);
      }
    })
  };


}
