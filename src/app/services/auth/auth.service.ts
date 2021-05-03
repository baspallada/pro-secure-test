import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Buffer } from 'buffer';

import { User } from '@clerq/models/User';
import { Token } from '@clerq/models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  jwt: Token;

  constructor(private jwtHelperService: JwtHelperService) { }

  /**
   * This method will return the saved user. If no user has been saved the method will check the localStorage.
   */
  public getUser(): User {
    const user = localStorage.getItem('user');
    if (this.user) {
      if (this.user.discordId) {
        return this.user;
      }
    } else if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  /**
   * This user will save the user to the global auth service and save the user to the localStorage.
   * @param user. The user to be saved
   */
  public setUser(user: User): void {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * This method will remove the saved user and the jwt from the service and the localStorage.
   */
  public logoutUser(): void {
    this.user = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  /**
   * This method will return the access token
   */
  public getToken(): Token {
    if (this.jwt) {
      if (this.jwt.sub) {
        return this.jwt;
      }
    }

    return this.parseJwt(localStorage.getItem('token'));
  }

  parseJwt(token: string) {
    if (token == null || token === '') {
      return;
    }

    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

  /**
   * This method will save the token to the service and to the localStorage.
   * @param jwt the token to be saved.
   */
  public setToken(jwt: string) {
    localStorage.setItem('token', jwt);
    const token = this.jwtHelperService.decodeToken(jwt);
    this.jwt = Token.createFromJwt(token);
  }

  /**
   * This method will return true if the token saved in the localStorage is valid/not expired.
   */
  public isValidToken(): boolean {
    return !this.jwtHelperService.isTokenExpired(localStorage.getItem('token'));
  }

  /**
   * This method will return true if a token has been found in the localStorage.
   */
  public hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
