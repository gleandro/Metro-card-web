import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environments";
import {UserEntity} from "../models/userEntity.model";
import {RechargeAccountEntity} from "../models/rechargeAccountEntitty";
import {Observable} from "rxjs";
import {ApiResponse} from "../models/apiResponse";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  user: UserEntity = new UserEntity()

  constructor(private http: HttpClient) {
    this.user = JSON.parse(localStorage.getItem('userInfo') || "");
  }

  // Account Service
  getAccounts() {
    const params = {userCode: this.user.userCode || ""};
    return this.http.get(environment.API_BASE_URL_ACCOUNT, {params: params});
  }

  addAccount(): Observable<ApiResponse> {
    return this.http.post(`${environment.API_BASE_URL_ACCOUNT}/${this.user.userCode}`, {});
  }

  // Recharge Account Service
  getRechargeAccounts() {
    const params = {userCode: this.user.userCode || ""};
    return this.http.get(environment.API_BASE_URL_RECHARGE_ACCOUNT, {params: params});
  }

  getRechargeAccountByCode(accountCode: string) {
    const params = {accountCode: accountCode, userCode: this.user.userCode || ""};
    return this.http.get(environment.API_BASE_URL_RECHARGE_ACCOUNT, {params: params});
  }

  addRechargeAccount(rechargeAccount: RechargeAccountEntity) {
    rechargeAccount.userCode = this.user.userCode;
    return this.http.post(environment.API_BASE_URL_RECHARGE_ACCOUNT, rechargeAccount);
  }

}
