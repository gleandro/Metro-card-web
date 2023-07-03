import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {AccountEntity} from "../../models/accountEntity";
import {formatCardNumber} from "../../util/util";
import {RechargeAccountEntity} from "../../models/rechargeAccountEntitty";
import * as moment from 'moment';
import Swal from 'sweetalert2';
import {ApiResponse} from "../../models/apiResponse";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  accounts: AccountEntity[] = [];
  rechargeAccounts: RechargeAccountEntity[] = [];

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.accountService.getAccounts().subscribe((data: any) => {
      this.accounts = data;
    });
  }

  detailAccount(accountCode: string) {
    this.accountService.getRechargeAccountByCode(accountCode).subscribe((data: any) => {
      console.log(data);
      this.rechargeAccounts = data;
    });
  }

  addAccount() {
    Swal.fire({
      title: 'Agregar cuenta',
      text: 'Si desea agregar una cuenta, por favor haga click en el botón aceptar.',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.accountService.addAccount().subscribe((resp: ApiResponse) => {
          this.accounts.push(resp.data);
          Swal.fire(resp.message, "", 'success')
        });
      }
    })
  }

  protected readonly formatCardNumber = formatCardNumber;
  protected readonly moment = moment;
}
