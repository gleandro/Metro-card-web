import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RechargeComponent} from "./recharge/recharge.component";
import {TransferComponent} from "./transfer/transfer.component";

const routes: Routes = [
  {
    path: 'metroCard', component: HomeComponent,
    children: [
      {path: '', component: DashboardComponent},
      {path: 'recharge', component: RechargeComponent},
      {path: 'transfer', component: TransferComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
