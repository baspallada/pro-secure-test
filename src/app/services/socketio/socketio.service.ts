import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import { environment } from "@clerq/environment";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket;
  constructor() { }
  setupSocketConnection() {
    this.socket = io(environment.url)
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

}
