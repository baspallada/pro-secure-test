import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class GeneralProvider {

  constructor(private http: HttpClient) { }

  getFeaturesFromJSON(): Observable<object> {
    return this.http.get('assets/data/features.json');
  }

  getCommandsFromJSON(): Observable<object> {
    return this.http.get('assets/data/commands.json');
  }

  getStaffFromJSON(): Observable<object> {
    return this.http.get('assets/data/staff.json');
  }
}
