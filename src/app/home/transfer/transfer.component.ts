import {Component, ViewChild} from '@angular/core';
import {AccountEntity} from "../../models/accountEntity";
import {RechargeAccountEntity} from "../../models/rechargeAccountEntitty";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {AccountService} from "../../services/account.service";
import Swal from "sweetalert2";
import * as moment from "moment/moment";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent {
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
