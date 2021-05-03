import { Component, OnInit } from '@angular/core';
import { ServerSelectionService } from '@clerq/pages/server-selection/server-selection.service';
import { Server } from '@clerq/interfaces/Server';

@Component({
  selector: 'app-server-selection',
  templateUrl: './server-selection.component.html',
  styleUrls: ['./server-selection.component.scss'],
  providers: [ServerSelectionService]
})
export class ServerSelectionComponent implements OnInit {
  public servers: Server[] = [];

  constructor(private readonly serverSelectionService: ServerSelectionService) { }

  ngOnInit() {
    this.serverSelectionService.getServers().subscribe(data => {
      // tslint:disable-next-line: forin
      for (const i in data) {
        const server: Server = data[i];
        const discordIconsUrl = 'https://cdn.discordapp.com/icons/';

        this.serverSelectionService.setServerNames(server.name);
        this.serverSelectionService.setServerIds(server.id);
        this.serverSelectionService.setServerInfo(server.id, server.name, server.permissions);

        this.servers.push({
          id: server.id,
          name: server.name,
          icon: (server.icon != null) ? discordIconsUrl + server.id + '/' + server.icon + '.png' : 'assets/images/no_img_available.png',
          owner: server.owner,
          permissions: server.permissions
        });
      }
      this.servers.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  selectServer(serverId, serverName, serverIcon, serverPermissions) {
    this.serverSelectionService.setSelectedServer(serverId, serverName, serverIcon, serverPermissions);

    localStorage.setItem('selectedServerId', serverId);
    localStorage.setItem('selectedServerName', serverName);
  }
}
