import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUserDetail } from '../models/login-user-detail';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  constructor(private http: HttpClient) { }

  userLogin(user: LoginUserDetail): Observable<any> {
    console.log("user login...");
    return this.http.post<LoginUserDetail>(environment.baseURL + "/sms/login", user);
  }

  userLogout() {
    console.log("user logging out...");
    window.sessionStorage.removeItem('username');
    window.sessionStorage.removeItem('packageCode');
    window.sessionStorage.removeItem('smsUserId');
    window.sessionStorage.removeItem('smsAccountId');
  }

  roleMatch(allowedRoles: any) {
    var isMatch = false;
    //var userRoles = JSON.parse(sessionStorage.getItem('userRole'));
    var userRoles: any = sessionStorage.getItem('packageCode');
    console.log(allowedRoles + "" +" == "+userRoles + "");
    //console.log();
    allowedRoles = allowedRoles + "";
    // userRoles = userRoles+"";

    if (allowedRoles === userRoles + "") {
      console.log("matched");
      isMatch = true;
    }

    return isMatch;
  }
}
