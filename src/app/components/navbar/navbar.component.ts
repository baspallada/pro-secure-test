import { Component, OnInit } from '@angular/core';
import { environment } from '@clerq/environment';
import { AuthService } from '@clerq/services/auth/auth.service';
import { User } from '@clerq/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loginLink: string;
  user: User;
  isMenuCollapsed = true;

  constructor(private readonly authService: AuthService, public router: Router) {
    this.user = this.authService.getUser();
  }

  ngOnInit() { }

  logOut() {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('selectedServerName');
    window.localStorage.removeItem('selectedServerId');
    window.location.reload();
    this.router.navigate(['/']);
  }

  logIn() {
    window.location.href = (environment.loginUrl + escape(environment.scopes));
  }
}
