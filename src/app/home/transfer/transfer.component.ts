import {Component, OnInit, ViewChild} from '@angular/core';
import {AccountEntity} from "../../models/accountEntity";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {AccountService} from "../../services/account.service";
import Swal from "sweetalert2";
import * as moment from "moment/moment";
import {TransferEntity} from "../../models/transferEntity";
import {ApiResponse} from "../../models/apiResponse";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  accounts: AccountEntity[] = [];
  transfer: TransferEntity = new TransferEntity();
  transferList: TransferEntity[] = [];

  // Table params
  displayedColumns: string[] = ['N', 'accountFrom', 'accountTo', 'comment', 'fecha', 'hora', 'monto'];
  dataSource!: MatTableDataSource<TransferEntity>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.accountService.getTrasnfers("").subscribe((data: any) => {
      this.transferList = data;
      this.dataSource = new MatTableDataSource<TransferEntity>(this.transferList);
      this.dataSource.paginator = this.paginator;
    });
    this.accountService.getAccounts().subscribe((data: any) => {
      this.accounts = data;
      this.transfer.accountCodeFrom = this.accounts.find(x => x.accountDefault)?.accountCode;
    });
  }

  submitForm() {
    if (this.accounts.find(x => x.accountCode === this.transfer.accountCodeFrom)?.accountNumber === this.transfer.accountCodeTo) {
      Swal.fire('La cuenta de origen y destino debe ser diferente', "", 'warning')
    } else {
      this.accountService.addTransfer(this.transfer).subscribe((resp: ApiResponse) => {
        if (resp.success) {
          Swal.fire('Transferencia exitosa!', resp.message, 'success').then(() => {
            this.transfer.amount = "0";
            this.transfer.accountCodeTo = "";
            this.transfer.comment = "";
            this.dataSource.data.unshift(resp.data);
            this.dataSource.data = this.dataSource.data.slice();
          });
        } else {
          Swal.fire('Transferencia fallida!', resp.message, 'error')
        }
      });
    }
  }

  getClass(data: TransferEntity) {
    return this.accounts.some(x => x.accountCode == data.accountCodeTo) ? 'text-primary' : 'text-danger';
  }

  protected readonly event = event;
  protected readonly moment = moment;
}
