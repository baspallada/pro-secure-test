import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '@clerq/models/User';
import { AuthService } from '@clerq/services/auth/auth.service';
import { Playlist } from '@clerq/models/Playlist';
import { environment } from '@clerq/environment';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  private user: User;
  public playlists: Playlist[] = [];

  constructor(private readonly authService: AuthService,
    private readonly http: HttpClient) {
    this.user = this.authService.getUser();
  }

  ngOnInit() {
    this.http.get(`${environment.baseUrl}/playlist/user/${this.user.discordId}`).subscribe(data => {
      for (let i in data) {
        this.playlists.push(Playlist.createFromRawObj(data[i]))
      }
    });

  }

}
