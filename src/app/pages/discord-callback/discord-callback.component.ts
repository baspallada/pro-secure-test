import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DiscordProvider } from '@clerq/providers/discord.provider';
import { User } from '@clerq/models/User';
import { AuthService } from '@clerq/services/auth/auth.service';

@Component({
  selector: 'app-discord-callback',
  templateUrl: './discord-callback.component.html',
  styleUrls: ['./discord-callback.component.scss'],
  providers: [DiscordProvider]
})
export class DiscordCallbackComponent implements OnInit {

  constructor(private router: Router, private discordProvider: DiscordProvider, private authService: AuthService) { }

  ngOnInit() {
    this.getCode();
  }

  private getCode(): void {
    // get the callback code from the url
    const code = window.location.href.split('=')[1];

    this.discordProvider.getTokenFromBackend(code).subscribe(data => {
      this.saveToken(data['jwt']);
      this.getUser();
    });
  }

  private saveToken(jwt: string): void {
    this.authService.setToken(jwt);
  }

  private getUser(): void {
    this.discordProvider.getDiscordUser(this.authService.jwt.sub).subscribe(data => {
      const user = User.createUserFromRawObject(data);
      this.authService.setUser(user);
      this.router.navigate(['/dashboard']);
    });
  }
}
