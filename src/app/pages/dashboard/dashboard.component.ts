import { Component, OnInit } from '@angular/core';
import { faCalendarAlt, faVolumeUp, faUserCog } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '@clerq/services/auth/auth.service';
import { User } from '@clerq/models/User';
import { Appointment } from '@clerq/models/Appointment';
import { Reminder } from '@clerq/models/Reminder';
import { AppointmentProvider } from '@clerq/providers/appointment.provider';
import { ReminderProvider } from '@clerq/providers/reminder.provider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  providers: [AppointmentProvider, ReminderProvider],
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  faCalendarAlt = faCalendarAlt;
  faVolumeUp = faVolumeUp;
  faUserCog = faUserCog;
  user: User;
  nextAppointment: Appointment;
  nextReminder: Reminder;

  constructor(private readonly authService: AuthService,
    private appointmentProvider: AppointmentProvider,
    private reminderProvider: ReminderProvider, 
    private router: Router) {}

  ngOnInit() {
    this.user = this.authService.getUser();

    // Route user back to server selection if localstorage has no value
    if (!localStorage.getItem('selectedServerId') || !localStorage.getItem('selectedServerName')) {
      this.router.navigate(['/dashboard/servers']);
    }

    this.appointmentProvider.getNextAppointment(this.user.discordId).subscribe(appointment => {
      if (appointment) {
        this.nextAppointment = Appointment.createFromRawObj(appointment);
      }
    });

    this.reminderProvider.getNextReminder(this.user.discordId).subscribe(reminder => {
      if (reminder) {
        this.nextReminder = Reminder.createFromRawObj(reminder);
      }
    });
  }

  // TODO: Make permission server-sided instead of client or check server-sided if the permissions are correct
  // ngDoCheck() {
  //   this.serverPermissions = this.serverSelectionService.getSelectedServerPermissions();
  // }
}
