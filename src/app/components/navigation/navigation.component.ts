import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {UserEntity} from "../../models/userEntity.model";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @Input() userInfo: UserEntity = new UserEntity();

  constructor(private router: Router) {
  }

  logout() {
    localStorage.removeItem('userInfo');
    this.router.navigate(['/login']);
  }

}
