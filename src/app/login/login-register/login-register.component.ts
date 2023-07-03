import {Component, EventEmitter, Output} from '@angular/core';
import {UserEntity} from "../../models/userEntity.model";
import {UserService} from "../../services/user.service";
import {ApiResponse} from "../../models/apiResponse";

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html'
})
export class LoginRegisterComponent {
  @Output() changeViewLogin: EventEmitter<boolean> = new EventEmitter<boolean>();
  user: UserEntity = new UserEntity();

  constructor(private userService: UserService) {
  }

  changeView() {
    this.changeViewLogin.emit(true);
  }

  submitForm() {
    this.userService.createUser(this.user).subscribe((data: ApiResponse) => {
      if (data.success) {
        this.changeView();
      } else {
        alert(data.message);
      }
    });
  };

}
