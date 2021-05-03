import { Component, OnInit } from '@angular/core';

import { environment } from '@clerq/environment';
import { Feature } from '@clerq/interfaces/Feature';
import { GeneralProvider } from '@clerq/providers/general.provider';
import { User } from '@clerq/models/User';
import { AuthService } from '@clerq/services/auth/auth.service';
import { ServerSelectionService } from '@clerq/pages/server-selection/server-selection.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  providers: [GeneralProvider, ServerSelectionService]
})
export class HomepageComponent implements OnInit {
  user: User;
  features: Feature[];
  selectedServerId: string;
  selectedServerName: string;
  messageToSend: string;

  constructor(private generalProvider: GeneralProvider,
    private readonly authService: AuthService,
    private readonly serverSelectionService: ServerSelectionService) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.selectedServerId = localStorage.getItem('selectedServerId');
    this.selectedServerName = localStorage.getItem('selectedServerName');

    this.generalProvider.getFeaturesFromJSON().subscribe(data => {
      this.features = data['features']['overview'];
    });
  }

  public scrollToFeatures(event) {
    event.srcElement.classList.remove('arrow-down');
    const element = document.getElementById('featuresList');
    if (element) {
      element.scrollIntoView();
    }
  }

  public login() {
    window.location.href = (environment.loginUrl + escape(environment.scopes));
  }

  public checkServer() {
    this.serverSelectionService.getSelectedServerId();
  }
}
