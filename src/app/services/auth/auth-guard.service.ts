import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService} from '@clerq/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(): boolean {
    if (!this.auth.isValidToken()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
