import {NgModule} from '@angular/core';
import {HomeRoutingModule} from "./home-routing.module";
import {DashboardComponent} from './dashboard/dashboard.component';
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RechargeComponent} from './recharge/recharge.component';
import {TransferComponent} from './transfer/transfer.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    DashboardComponent,
    RechargeComponent,
    TransferComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule
  ]
})
export class HomeModule {
}
