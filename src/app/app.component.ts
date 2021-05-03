import { Component } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/en-gb';
import { SocketioService } from './services/socketio/socketio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'clerq-site';

  constructor(private socketService: SocketioService) {
    this.socketService.setupSocketConnection()

    moment.locale('en-gb');
  }
}
