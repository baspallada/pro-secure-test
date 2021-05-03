import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@clerq/environment';
import { AuthService } from '@clerq/services/auth/auth.service';
import { User } from '@clerq/models/User';
import { Playlist } from '@clerq/models/Playlist';
import { Song } from '@clerq/models/Song';

@Injectable()
export class PlaylistProvider {
  private user: User;

  constructor(private readonly http: HttpClient,
    private readonly authService: AuthService) {
    this.user = authService.getUser();
  }

  getPlaylistSongs(playlistName) {
    return this.http.get(`${environment.baseUrl}/playlist/user/${this.user.discordId}/${playlistName}`);
  }

  removeSong(playlistName: string, songName: string) {
    return this.http.delete(`${environment.baseUrl}/playlist/user/${this.user.discordId}/${playlistName}/${encodeURIComponent(songName)}`);
  }

  async addSong(url: string, playlist: Playlist) {
    let song: Song;
    const ytId = this.youtubeParser(url);
    if (ytId) {
      const ytData = await this.http.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&key=${environment.youtubeApiKey}&id=${ytId}`).toPromise();
      let thumbnail: string;
      if (ytData['items'][0]['snippet']['thumbnails']['maxres']) {
        thumbnail = ytData['items'][0]['snippet']['thumbnails']['maxres']['url'];
      } else {
        thumbnail = ytData['items'][0]['snippet']['thumbnails']['default']['url'];
      }

      song = {
        artist: ytData['items'][0]['snippet']['channelTitle'],
        songName: ytData['items'][0]['snippet']['title'],
        duration: ytData['items'][0]['contentDetails']['duration'],
        songYoutubeId: ytId,
        thumbnailUrl: thumbnail,
        originalUrl: url
      };

      const playlistDto = JSON.stringify({ playlistName: playlist.playlistName, songs: [song], creatorId: this.user.discordId });
      return await this.http.put(`${environment.baseUrl}/playlist/user/${this.user.discordId}/${playlist.playlistName}`, playlistDto).toPromise() as Playlist;
    } else {
    }
  }

  youtubeParser(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match[7]?.length === 11) ? match[7] : false;
  }
}
