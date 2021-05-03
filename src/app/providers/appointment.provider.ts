import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@clerq/environment';
import { Appointment } from '@clerq/models/Appointment';

@Injectable()
export class AppointmentProvider {

  constructor(private http: HttpClient) { }

  getAppointmentsForUser(userId: string): Observable<object> {
    return this.http.get(`${ environment.baseUrl }/appointment/userid/${ userId }/all`);
  }

  getNextAppointment(userId: string): Observable<object> {
    return this.http.get(`${ environment.baseUrl }/appointment/userid/${ userId }/next`);
  }

  deleteAppointment(appointment: Appointment, userId: string): Observable<object> {
    return this.http.delete(`${ environment.baseUrl }/appointment/userid/${ userId }/id/${ appointment.appointmentId }`);
  }

  updateAppointment(appointment: Appointment, userId: string): Observable<object> {
    return this.http.put(`${ environment.baseUrl }/appointment/userid/${ userId }/id/${ appointment.appointmentId }`, appointment);
  }
}
