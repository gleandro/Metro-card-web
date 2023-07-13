import {Injectable} from '@angular/core';
import {UserEntity} from "../models/userEntity.model";
import {Observable} from "rxjs";
import {environment} from "../../environments/environments";
import {HttpClient} from "@angular/common/http";
import {ApiResponse} from "../models/apiResponse";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  loginUser(user: UserEntity): Observable<ApiResponse> {
    const url = `${environment.API_BASE_URL_USER}/login`;
    return this.http.post(url, user);
  }

  createUser(user: UserEntity): Observable<ApiResponse> {
    const url = `${environment.API_BASE_URL_USER}`;
    return this.http.post(url, user);
  }

  resetPassword(dni: string) {
    const params = {dni: dni};
    return this.http.get(environment.API_BASE_URL_USER + "/reset-password", {params: params});
  }

}
