import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserLoginService } from '../services/user-login.service';

@Injectable({
  providedIn: 'root'
})
export class CPAdminGuard implements CanActivate {

  constructor(private router: Router, private userService: UserLoginService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (sessionStorage.getItem('packageCode') != null) {
      let roles = route.data["packages"] as Array<string>;
      if (roles) {
        var match = this.userService.roleMatch(roles);
        console.log("match : " + match)
        if (match) return true;
        else {
          this.router.navigate(['/learngenix']);
          return false;
        }
      }
      else
        return true;
    }
    this.router.navigate(['/learngenix/signIn']);
    return false;
  }
}
