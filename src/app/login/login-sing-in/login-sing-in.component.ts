import {Component, EventEmitter, Output} from '@angular/core';
import {UserEntity} from "../../models/userEntity.model";
import {UserService} from "../../services/user.service";
import {ApiResponse} from "../../models/apiResponse";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login-sing-in',
  templateUrl: './login-sing-in.component.html',
  styleUrls: ['./login-sing-in.component.scss']
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
        Swal.fire(resp.message, "", 'error')
      }
    })
  };

  resetPassword() {
    Swal.fire({
      title: 'Ingresa tu dni',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      confirmButtonText: 'Resetear Contraseña',
      showLoaderOnConfirm: true,
      preConfirm: (dni) => {
        return fetch(`http://localhost:8080/user/reset-password?dni=${dni}`).then(response => {
          return response.json();
        });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      console.log(result)
      Swal.fire(result.value.message, "", 'info')
    })
  }
}
