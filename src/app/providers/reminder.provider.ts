import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@clerq/environment';

@Injectable()
export class ReminderProvider {

  constructor(private http: HttpClient) { }

  getNextReminder(userId: string): Observable<object> {
    return this.http.get(`${ environment.baseUrl }/reminder/userid/${ userId }/next`);
  }

  getAllRemindersFromUser(userId: string): Observable<object> {
    return this.http.get(`${ environment.baseUrl }/reminder/userid/${ userId }/all`);
  }

  removeReminder(reminderId: number, userId: string): Observable<object> {
    return this.http.delete(`${ environment.baseUrl }/reminder/userid/${ userId }/id/${ reminderId }`);
  }
}
