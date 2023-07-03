import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  viewLogin: boolean = true;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    localStorage.getItem('userInfo') && this.router.navigate(['/metroCard']);
  }

  onChangeViewLogin = (event: boolean) => {
    this.viewLogin = event;
  }

}
