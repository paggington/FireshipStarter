import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {SnackService} from "../../../services/snack.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth,private snack:SnackService) {
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Promise<boolean> {

    const user=await this.afAuth.currentUser;
    const isLoggedIn=!!user;
    if(!isLoggedIn){
      this.snack.authError();
    }
    return isLoggedIn;
  }

}