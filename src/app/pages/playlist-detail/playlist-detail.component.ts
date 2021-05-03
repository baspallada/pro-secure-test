import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { Subscription, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';
import { faPlayCircle, faClock, faCalendarCheck, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

import { Playlist } from '@clerq/models/Playlist';
import { AuthService } from '@clerq/services/auth/auth.service';
import { User } from '@clerq/models/User';
import { Song } from '@clerq/models/Song';
import { PlaylistProvider } from '@clerq/providers/playlist.provider';
import { ServerSelectionService } from '../server-selection/server-selection.service';
import { SocketioService } from '@clerq/services/socketio/socketio.service';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.scss'],
  providers: [PlaylistProvider, ServerSelectionService]
})
export class PlaylistDetailComponent implements OnInit {
  public faPlayCircle = faPlayCircle;
  public faClock = faClock;
  public faCalendarCheck = faCalendarCheck;
  public faSearch = faSearch;
  public faTimes = faTimes;

  public playlist: Playlist;
  public songs: Song[];
  private playlistName: string;
  public user: User;
  public statusMsg: string;
  public status: string;

  private routeSub: Subscription;

  public songs$: Observable<Song[]>;
  public filter = new FormControl('');

  public showAdd = false;
  public addUrl: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly playlistProvider: PlaylistProvider,
    private readonly socket: Socket,
    private readonly socketService: SocketioService) {

    this.user = this.authService.getUser();

    this.routeSub = this.route.params.subscribe(params => {
      this.playlistName = params['name'];
    });

    this.playlistProvider.getPlaylistSongs(this.playlistName).subscribe(data => {
      this.playlist = Playlist.createFromRawObj(data);
      this.songs = this.playlist.songs;

      this.songs$ = this.filter.valueChanges.pipe(
        startWith(''),
        map(text => this.search(text))
      );
    }, error => {
      this.router.navigate(['/404'], { skipLocationChange: true });
    });
  }

  ngOnInit() {
    this.socketService.listen('playlistCallback').subscribe((data) => {
      this.showReplyMessage(data);
    });

    this.socketService.listen('songCallback').subscribe((data) => {
      this.showReplyMessage(data);
    });
  }

  search(text: string): Song[] {
    return this.songs.filter(song => {
      const term = text.toLowerCase();
      if (song.artist) {
        return song.songName.toLowerCase().includes(term) || song.artist.toLowerCase().includes(term);
      } else {
        return song.songName.toLowerCase().includes(term);
      }
    });
  }

  removeSong(songName) {
    this.playlistProvider.removeSong(this.playlistName, songName).subscribe(data => {
      this.playlist = data as Playlist;

      // TODO: Properly reload the table.
      location.reload();
    });
  }

  async addSong(url: string) {
    const playlist = await this.playlistProvider.addSong(url, this.playlist);
    this.playlist = playlist;
    this.songs = this.playlist.songs;

    // TODO: Properly reload the table.
    location.reload();
  }

  openAdd() {
    if (this.showAdd && this.addUrl) {
      this.addSong(this.addUrl);
      this.addUrl = null;
    }

    this.showAdd = !this.showAdd;
  }

  playPlaylist() {
    const serverId = window.localStorage.getItem('selectedServerId');
    this.socket.emit('sendPlayPlaylist',
      { serverId, playlistName: this.playlist.playlistName, userId: this.user.discordId });
  }

  playSong(song) {
    const serverId = window.localStorage.getItem('selectedServerId');
    this.socket.emit('sendSong',
      { serverId, song, userId: this.user.discordId });
  }

  showReplyMessage(data) {
    this.status = data['status'];
    this.statusMsg = data['message'];

    const fadeTarget = document.getElementById('statusBox') as any;
    const statusCard = document.getElementById('statusCard') as any;

    if (this.status === 'Error') {
      statusCard.classList.remove('bg-success');
      statusCard.classList.add('bg-danger');
    } else {
      statusCard.classList.remove('bg-danger');
      statusCard.classList.add('bg-success');
    }

    fadeTarget.style.opacity = 1;
    setTimeout(() => {
      const fadeEffect = setInterval(() => {
        if (!fadeTarget.style.opacity) {
          fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
          fadeTarget.style.opacity -= 0.1;
        } else {
          clearInterval(fadeEffect);
        }
      }, 100);
    }, 3000);
  }
}
