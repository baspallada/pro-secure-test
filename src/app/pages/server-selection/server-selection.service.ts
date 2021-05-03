import { Injectable } from '@angular/core';
import { AuthService } from '@clerq/services/auth/auth.service';
import { Token } from '@clerq/models/token';
import { DiscordProvider } from '@clerq/providers/discord.provider';


@Injectable()
  export class ServerSelectionService {
      token: Token;
      selectedServerId: any;
      selectedServerName: any;
      selectedServerIcon: any;
      selectedServerPermissions: any;
      serverNames: any = [];
      serverIds: any = [];
      serverDict = [];

    constructor(private readonly authService: AuthService, private readonly discordProvider: DiscordProvider) {
        this.token = authService.getToken();
     }

  public getServers() {
    return this.discordProvider.getDiscordGuilds(this.token.accessToken);
  }

  public getSelectedServerId() {
    return this.selectedServerId;
  }

  public getSelectedServerName() {
    return this.selectedServerName;
  }

  public setServerNames(serverName) {
    this.serverNames.push(serverName);
  }

  public setServerIds(serverId) {
    this.serverIds.push(serverId);
  }

  public setSelectedServerName(serverName) {
    this.selectedServerName = serverName;
  }

  public setSelectedServerId(serverId) {
    this.selectedServerId = serverId;
  }

  public setServerInfo(serverId, serverName, serverPermissions) {
    this.serverDict.push({
      id: serverId,
      name: serverName,
      permissions: serverPermissions
    });
  }

  public setSelectedServer(serverId, serverName, serverIcon, serverPermissions) {
    this.selectedServerId = serverId;
    this.selectedServerName = serverName;
    this.selectedServerIcon = serverIcon;
    this.selectedServerPermissions = serverPermissions;
  }
}
