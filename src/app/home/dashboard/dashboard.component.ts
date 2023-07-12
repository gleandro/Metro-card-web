import {Component, OnInit, ViewChild} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {AccountEntity} from "../../models/accountEntity";
import {formatCardNumber} from "../../util/util";
import * as moment from 'moment';
import Swal from 'sweetalert2';
import {ApiResponse} from "../../models/apiResponse";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {TransferEntity} from "../../models/transferEntity";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  accounts: AccountEntity[] = [];
  transfers: TransferEntity[] = [];

  // Table params
  displayedColumns: string[] = ['N', 'tipo', 'numeroFrom', 'numeroTo', 'fecha', 'hora', 'monto'];
  dataSource!: MatTableDataSource<TransferEntity>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.accountService.getAccounts().subscribe((data: any) => {
      this.accounts = data;
    });
    this.dataSource = new MatTableDataSource<TransferEntity>(this.transfers);
    this.dataSource.paginator = this.paginator;
  }

  detailAccount(accountCode: string) {
    this.accountService.getAllTransaction(accountCode).subscribe((data: any) => {
      data.sort((a: any, b: any) => {
        return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
      });
      this.dataSource = new MatTableDataSource<TransferEntity>(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  getClass(transfer: TransferEntity) {
    if (transfer.typeTransaction === 'Recharge') return 'text-success';

    let accountFrom = this.accounts.some(x => x.accountCode == transfer.accountCodeFrom);
    let accountTo = this.accounts.some(x => x.accountCode == transfer.accountCodeTo);

    if (accountFrom && accountTo) return 'text-primary';
    if (accountFrom) return 'text-danger';
    if (accountTo) return 'text-success';
    return 'text-info';
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
