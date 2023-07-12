import {Component, OnInit, ViewChild} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {AccountEntity} from "../../models/accountEntity";
import {RechargeAccountEntity} from "../../models/rechargeAccountEntitty";
import Swal from "sweetalert2";
import * as moment from "moment/moment";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.scss']
})
export class RechargeComponent implements OnInit {
  accounts: AccountEntity[] = [];
  rechargeAccount: RechargeAccountEntity = new RechargeAccountEntity();
  rechargeAccounts: RechargeAccountEntity[] = [];

  // Table params
  displayedColumns: string[] = ['N', 'codigo', 'numero', 'fecha', 'hora', 'monto'];
  dataSource!: MatTableDataSource<RechargeAccountEntity>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.accountService.getRechargeAccounts().subscribe((data: any) => {
      this.rechargeAccounts = data;
      this.dataSource = new MatTableDataSource<RechargeAccountEntity>(this.rechargeAccounts);
      this.dataSource.paginator = this.paginator;
    });
    this.accountService.getAccounts().subscribe((data: any) => {
      this.accounts = data;
      this.rechargeAccount.accountCode = this.accounts.find(x => x.accountDefault)?.accountCode;
    });
  }

  submitForm() {
    if (this.rechargeAccount.amount == 0) {
      Swal.fire('El monto no puede ser 0!', "", 'warning');
      return;
    }
    this.accountService.addRechargeAccount(this.rechargeAccount).subscribe((resp: any) => {
      Swal.fire('Recarga exitosa!', resp.message, 'success').then(() => {
        this.rechargeAccount.amount = 0
        this.dataSource.data.unshift(resp.data);
        this.dataSource.data = this.dataSource.data.slice();
      });
    });

  }

  protected readonly event = event;
  protected readonly moment = moment;
}
