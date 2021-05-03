import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import { CalendarView } from 'angular-calendar';
import * as moment from 'moment';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';

import { User } from '@clerq/models/User';
import { Appointment } from '@clerq/models/Appointment';
import { CalendarAppointment } from '@clerq/interfaces/CalendarAppointment';
import { AuthService } from '@clerq/services/auth/auth.service';
import { AppointmentProvider } from '@clerq/providers/appointment.provider';

@Component({
  selector: 'app-appointments',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
  providers: [AppointmentProvider],
  animations: [
    trigger('expandCollapse', [
      state('open', style({ height: 1, opacity: 1 })),
      state('closed', style({ height: 0, opacity: 0 })),
      transition('* <=> *', [animate('200ms')])
    ]),
  ]
})
export class AppointmentsComponent implements OnInit {
  refresh: Subject<any> = new Subject();
  private readonly user: User;
  public editIsCollapsed = true;
  public deleteIsCollapsed = true;
  public selectedEvent = null;

  public view: CalendarView = CalendarView.Month;
  public CalendarView = CalendarView;
  public viewDate: Date = new Date();
  public appointments: CalendarAppointment[] = [];
  activeDayIsOpen = true;
  actions: any[] = [
    {
      label: '<i class="fa fa-fw fa-pencil disabled" [attr.aria-expanded]="!editIsCollapsed" aria-controls="editEventCollapsable"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarAppointment }): void => {
        // This toggles the edit-screen collapsable
        this.editIsCollapsed = false;
        this.selectedEvent = event;
      }
    },
    {
      label: '<i class="fa fa-fw fa-times" [attr.aria-expanded]="!deleteIsCollapsed" aria-controls="deleteEventCollapsable"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarAppointment }): void => {
        // This toggles the 'are you sure' collapsable
        this.deleteIsCollapsed = false;
        this.selectedEvent = event;
      }
    }
  ];

  constructor(private readonly authService: AuthService,
              private readonly socket: Socket,
              private readonly appointmentProvider: AppointmentProvider) {
                  this.user = this.authService.getUser();
  }

  ngOnInit() {
    this.appointmentProvider.getAppointmentsForUser(this.user.discordId).subscribe(data => {
      // tslint:disable-next-line: forin
      for (const i in data) {
        const appointment: Appointment = Appointment.createFromRawObj(data[i]);

        this.appointments.push({
          start: new Date(appointment.dateStart),
          end: new Date(appointment.dateEnd),
          title: appointment.title,
          color: {
            primary: '#2C2F33',
            secondary: '#99AAB5'
          },
          actions: this.actions,
          note: appointment.note,
          createdAt: moment(appointment.createdAt).format('LLL'),
          dateStart: moment(appointment.dateStart).format('LLL'),
          dateEnd: moment(appointment.dateEnd).format('LLL'),
          attendees: appointment.attendees,
          location: appointment.location,
          appointmentId: appointment.appointmentId,
          creatorId: appointment.creatorId
        });
      }
      this.refresh.next();
    });
  }


  dayClicked({ date, events }: { date: Date; events: CalendarAppointment[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0);
      this.viewDate = date;
    }
  }

  selectAppointment(event: CalendarAppointment): void {
    this.editIsCollapsed = false;
    this.selectedEvent = event;
  }

  toggleDeleteCollapsable() {
    this.deleteIsCollapsed = !this.deleteIsCollapsed;
  }

  toggleAppointmentCollapsable() {
    this.editIsCollapsed = !this.editIsCollapsed;
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  deleteAppointment() {
    const appointment = this.processEvent(this.selectedEvent);
    this.appointmentProvider.deleteAppointment(appointment, this.user.discordId).subscribe();
    this.appointments = this.appointments.filter(event => event !== this.selectedEvent);
    this.deleteIsCollapsed = true;
    this.sendAppointmentEditedEvent(appointment, 'Deleted');
  }

  updateEvent() {
    const appointment = this.processEvent(this.selectedEvent);
    this.appointmentProvider.updateAppointment(appointment, this.user.discordId).subscribe();
    this.editIsCollapsed = true;
    this.sendAppointmentEditedEvent(appointment, 'Edited');
  }

  processEvent(event): Appointment {
    event.dateStart = new Date(event.start);
    event.dateEnd = new Date(event.end);
    event.createdAt = new Date(event.createdAt);

    const appointment = Appointment.createFromRawObj(this.selectedEvent);

    delete appointment['color'];
    delete appointment['actions'];
    delete appointment['start'];
    delete appointment['end'];

    return appointment;
  }

  public sendAppointmentEditedEvent(appointment: Appointment, action: string) {
    this.socket.emit('sendAppointmentEdited', { appointment, Action: action, Author: this.user.discordId }, () => {
    });
  }
}
