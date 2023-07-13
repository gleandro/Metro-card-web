import {Component, EventEmitter, Output} from '@angular/core';
import {UserEntity} from "../../models/userEntity.model";
import {UserService} from "../../services/user.service";
import {ApiResponse} from "../../models/apiResponse";
import Swal from 'sweetalert2';


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
    this.userService.createUser(this.user).subscribe((resp: ApiResponse) => {
      if (resp.success) {
        this.changeView();
        Swal.fire(resp.message, "", 'success')
      } else {
        Swal.fire(resp.message, "", 'error')
      }
    });
  };

}
