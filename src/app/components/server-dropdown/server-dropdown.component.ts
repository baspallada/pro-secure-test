import { Component, OnInit, HostListener } from '@angular/core';
import { ServerSelectionService } from '@clerq/pages/server-selection/server-selection.service';
import { Server } from '@clerq/interfaces/Server';

@Component({
  selector: 'app-server-dropdown',
  templateUrl: './server-dropdown.component.html',
  styleUrls: ['./server-dropdown.component.scss'],
  providers: [ServerSelectionService]
})
export class ServerDropdownComponent implements OnInit {
  currentServerName: string;
  currentServerPermissions: string;
  servers: Server[] = [];

  constructor(private readonly serverSelectionService: ServerSelectionService) { }

  ngOnInit() {
    const serverName = localStorage.getItem('selectedServerName');
    const serverId = Number(localStorage.getItem('selectedServerId'));

    this.serverSelectionService.setSelectedServerName(serverName);
    this.currentServerName = serverName;

    // Check if localStorage has values, otherwise dont call to discord API to prevent rate-limit on reroute
    if (serverName && serverId) {
      this.serverSelectionService.getServers().subscribe(data => {
        // tslint:disable-next-line: forin
        for (const i in data) {
          const server: Server = data[i];

          this.serverSelectionService.setServerNames(server.name);
          this.serverSelectionService.setServerIds(server.id);
          this.serverSelectionService.setServerInfo(server.id, server.name, server.permissions);

          this.servers.push({
            id: server.id,
            name: server.name,
            permissions: server.permissions
          });

          // TODO: Permissions should be server sided
          // if (serverName == server.name && serverId == server.id) {
          //   this.currentServerPermissions = server.permissions;
          //   this.serverSelectionService.setSelectedServerPermissions(server.permissions);
          // }
        }
        this.servers.sort((a, b) => a.name.localeCompare(b.name));
      });
    }
  }

  ngDoCheck() {
    this.currentServerName = this.serverSelectionService.getSelectedServerName();
  }

  setSelectedServerInfo(selectedVendor) {
    const selectedServerInfo = JSON.parse(selectedVendor);

    this.serverSelectionService.setSelectedServerId(selectedServerInfo.id);
    this.serverSelectionService.setSelectedServerName(selectedServerInfo.name);
    // this.serverSelectionService.setSelectedServerPermissions(selectedServerInfo.permissions);

    localStorage.setItem('selectedServerId', selectedServerInfo.id);
    localStorage.setItem('selectedServerName', selectedServerInfo.name);
  }
}