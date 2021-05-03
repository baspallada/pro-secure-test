import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@clerq/environment';

@Injectable()
export class DiscordProvider {

  constructor(private http: HttpClient) {
  }

  public getTokenFromBackend(code: string): Observable<object> {
    return this.http.get(`${environment.baseUrl}/auth/login/${code}`);
  }

  public getDiscordUser(id: number): Observable<object> {
    return this.http.get(`${environment.baseUrl}/user/id/${id}`);
  }

  public getDiscordGuilds(accessToken: string): Observable<object> {
    const headerDict = {
      Authorization: 'Bearer ' + accessToken
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };

    return this.http.get(`https://discordapp.com/api/users/@me/guilds`, requestOptions);
  }
}
