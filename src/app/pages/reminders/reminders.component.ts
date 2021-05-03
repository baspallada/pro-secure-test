import { Component, OnInit } from '@angular/core';
import { Reminder } from '@clerq/interfaces/Reminder';
import { User } from '@clerq/models/User';
import { AuthService } from '@clerq/services/auth/auth.service';
import * as moment from 'moment';
import { DateService } from '@clerq/services/dates/date.service';
import { ReminderProvider } from '@clerq/providers/reminder.provider';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss'],
  providers: [ReminderProvider]
})
export class RemindersComponent implements OnInit {
  private readonly user: User;
  public reminders: Reminder[] = [];
  public tempReminder: Reminder;
  public showModal: boolean;

  constructor(private readonly reminderProvider: ReminderProvider,
              private readonly authService: AuthService,
              private readonly dateService: DateService) {
                this.user = this.authService.getUser();
  }

  ngOnInit() {
    this.reminderProvider.getAllRemindersFromUser(this.user.discordId).subscribe(data => {
      // tslint:disable-next-line: forin
      for (const i in data) {
        const reminder: Reminder = data[i];

        const creationDate = moment(reminder.createdAt);
        const dueDate = moment(reminder.dueDate);
        const diffTime = moment(reminder.dueDate).fromNow();
        const inBot = this.dateService.isInBot(reminder.dueDate);

        this.reminders.push({
          reminderId: reminder.reminderId,
          title: reminder.title,
          createdAt: creationDate.format('LLL'),
          dueDate: dueDate.format('LLL'),
          timeLeft: diffTime,
          inBot: inBot.inBot,
          reason: inBot.reason
        });
      }
      this.reminders.sort((a, b) => {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
    });
  }

  deleteReminder() {
    this.reminderProvider.removeReminder(this.tempReminder.reminderId, this.user.discordId).subscribe();
    this.reminders = this.reminders.filter(item => item.reminderId !== this.tempReminder.reminderId);
  }

  saveTempReminder(tempReminder: Reminder) {
    this.tempReminder = tempReminder;
  }

  setReminderTitle() {
    if (this.tempReminder.inBot) {
      document.querySelector('.modal-body').textContent = `${this.tempReminder.reason}\r\nDo you still want to delete it?`;
    } else {
      document.querySelector('.modal-body').textContent = `Are you sure you want to delete ${this.tempReminder.title}?`;
    }
    document.querySelector('.modal-title').textContent = `Deleting ${this.tempReminder.title}`;
  }

  clearTempValues() {
    this.tempReminder = null;
  }
}
